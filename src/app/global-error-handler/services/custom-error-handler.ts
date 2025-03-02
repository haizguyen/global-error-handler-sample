import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogService } from './log.service';
import { ErrorResponse } from '../models/error.model';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(
    private logService: LogService,
    private zone: NgZone
  ) {}

  handleError(error: Error | HttpErrorResponse | ErrorResponse): void {
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
          this.logService.log(
            'An unexpected HTTP error occurred.',
            'error',
            this.getErrorDetails(error),
            { toast: true }
          );
        }
      } else {
        // Handle other errors (runtime errors, etc.)
        this.logService.log(
          'An unexpected error occurred.',
          'error',
          this.getErrorDetails(error),
          { toast: true }
        );
      }
    });
  }

  private isErrorResponse(error: any): error is ErrorResponse {
    return error && 'friendlyMessage' in error && 'error' in error;
  }

  private getErrorDetails(error: Error | HttpErrorResponse): string {
    const details: string[] = [
      `Type: ${error.constructor.name}`,
      `Message: ${error.message}`
    ];

    if (error instanceof HttpErrorResponse) {
      details.push(
        `Status: ${error.status} ${error.statusText}`,
        `URL: ${error.url}`
      );
    }

    if ('stack' in error && error.stack) {
      details.push(`Stack: ${error.stack}`);
    }

    return details.join('\n');
  }
}