import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorCode, ErrorMessages, ErrorResponse, mapHttpStatusToErrorCode } from '../models/error.model';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private logService: LogService,
    private zone: NgZone
  ) {}

  /**
   * Implementation of Angular's ErrorHandler interface
   */
  handleError(error: any): void {
    // Run inside Angular's zone to ensure UI updates
    this.zone.run(() => {
      if (this.isErrorResponse(error)) {
        // Handle our custom ErrorResponse
        this.logService.log(
          error.friendlyMessage,
          'error',
          error.technicalDetails,
          { toast: true }
        );
      } else if (error instanceof HttpErrorResponse) {
        // Only handle if not already handled by services
        if (!error.headers?.get('X-Error-Handled')) {
          const errorResponse = this.createErrorResponse(
            'An unexpected HTTP error occurred.',
            ErrorCode.UNKNOWN_ERROR,
            this.formatTechnicalDetails('UnhandledHttpError', error)
          );
          this.logService.log(
            errorResponse.friendlyMessage,
            'error',
            errorResponse.technicalDetails,
            { toast: true }
          );
        }
      } else {
        // Handle runtime errors
        const errorResponse = this.createErrorResponse(
          'An unexpected error occurred.',
          ErrorCode.UNKNOWN_ERROR,
          this.formatTechnicalDetails('RuntimeError', error instanceof Error ? error : new Error(String(error)))
        );
        this.logService.log(
          errorResponse.friendlyMessage,
          'error',
          errorResponse.technicalDetails,
          { toast: true }
        );
      }
    });
  }

  /**
   * Handle HTTP errors with detailed information and return an Observable
   */
  handleHttpError(operation: string, error: HttpErrorResponse, additionalInfo?: any): Observable<never> {
    let errorCode = mapHttpStatusToErrorCode(error.status);
    
    // Handle offline state
    if (!navigator.onLine) {
      errorCode = ErrorCode.OFFLINE;
    }

    // Handle validation errors
    if (error.status === 400 && error.error?.errors) {
      const validationErrors = Object.values(error.error.errors);
      if (validationErrors.length > 0) {
        additionalInfo = { ...additionalInfo, validationErrors };
      }
    }

    const errorResponse: ErrorResponse = {
      error: {
        code: errorCode,
        message: error.message,
        details: error.error,
        timestamp: new Date().toISOString()
      },
      friendlyMessage: error.error?.message || ErrorMessages[errorCode],
      technicalDetails: this.formatTechnicalDetails(operation, error, additionalInfo)
    };

    // Log the error with technical details
    this.logService.log(
      errorResponse.friendlyMessage,
      'error',
      errorResponse.technicalDetails,
      { toast: true }
    );

    return throwError(() => errorResponse);
  }

  /**
   * Create a standardized error response
   */
  createErrorResponse(message: string, code: ErrorCode = ErrorCode.UNKNOWN_ERROR, details?: any): ErrorResponse {
    return {
      error: {
        code,
        message,
        details,
        timestamp: new Date().toISOString()
      },
      friendlyMessage: ErrorMessages[code] || message
    };
  }

  private isErrorResponse(error: any): error is ErrorResponse {
    return error && 'friendlyMessage' in error && 'error' in error;
  }

  private formatTechnicalDetails(operation: string, error: Error | HttpErrorResponse, additionalInfo?: any): string {
    const details: string[] = [
      `Operation: ${operation}`,
      `Type: ${error.constructor.name}`,
      `Message: ${error.message}`,
      `Time: ${new Date().toISOString()}`
    ];

    if (error instanceof HttpErrorResponse) {
      details.push(
        '=== HTTP Details ===',
        `Status: ${error.status} ${error.statusText}`,
        `URL: ${error.url}`
      );

      if (error.error?.message) {
        details.push(`Server Message: ${error.error.message}`);
      }
    }

    if (additionalInfo) {
      details.push(
        '=== Additional Info ===',
        typeof additionalInfo === 'string' ? additionalInfo : JSON.stringify(additionalInfo, null, 2)
      );
    }

    // Add stack trace if available
    if ('stack' in error && error.stack) {
      details.push(
        '=== Stack Trace ===',
        error.stack
      );
    }

    return details.join('\n');
  }
}