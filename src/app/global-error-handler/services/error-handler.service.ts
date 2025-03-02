import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorCode, ErrorMessages, ErrorResponse, mapHttpStatusToErrorCode } from '../models/error.model';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private logService: LogService) {}

  handleError(operation: string, error: HttpErrorResponse, additionalInfo?: any): Observable<never> {
    const errorCode = mapHttpStatusToErrorCode(error.status);
    const friendlyMessage = ErrorMessages[errorCode];
    
    const errorResponse: ErrorResponse = {
      error: {
        code: errorCode,
        message: error.message,
        details: error.error,
        timestamp: new Date().toISOString()
      },
      friendlyMessage,
      technicalDetails: this.formatTechnicalDetails(operation, error, additionalInfo)
    };

    // Log the error with technical details
    this.logService.log(
      friendlyMessage,
      'error',
      errorResponse.technicalDetails,
      { toast: true }
    );

    return throwError(() => errorResponse);
  }

  private formatTechnicalDetails(operation: string, error: HttpErrorResponse, additionalInfo?: any): string {
    let details = `Operation: ${operation}\n`;
    details += `Status: ${error.status} ${error.statusText}\n`;
    details += `URL: ${error.url}\n`;
    
    if (error.error?.message) {
      details += `Server Message: ${error.error.message}\n`;
    }

    if (additionalInfo) {
      details += `Additional Info: ${JSON.stringify(additionalInfo, null, 2)}\n`;
    }

    // Type assertion for stack trace access
    const errorWithStack = error as unknown as Error;
    if (errorWithStack.stack) {
      details += `Stack Trace: ${errorWithStack.stack}`;
    }

    return details;
  }

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
}