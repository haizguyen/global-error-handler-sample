import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogService } from '../../global-error-handler/services/log.service';
import { ErrorResponse } from '../../global-error-handler/models/error.model';

@Injectable()
export class DemoErrorHandler implements ErrorHandler {
  constructor(
    private logService: LogService,
    private zone: NgZone
  ) {}

  handleError(error: Error | HttpErrorResponse | ErrorResponse): void {
    this.zone.run(() => {
      if (this.isErrorResponse(error)) {
        // For demo errors, we'll show them as popups instead of toasts
        this.logService.log(
          `Demo Error: ${error.friendlyMessage}`,
          'error',
          error.technicalDetails,
          { popup: true }
        );
      } else if (error instanceof HttpErrorResponse) {
        if (!error.headers?.get('X-Error-Handled')) {
          this.logService.log(
            'Demo encountered an HTTP error.',
            'error',
            this.getErrorDetails(error),
            { popup: true }
          );
        }
      } else {
        // For runtime errors in demo, show more details to the user
        this.logService.log(
          `Demo Runtime Error: ${error.message}`,
          'error',
          this.getErrorDetails(error),
          { popup: true }
        );
      }
    });
  }

  private isErrorResponse(error: any): error is ErrorResponse {
    return error && 'friendlyMessage' in error && 'error' in error;
  }

  private getErrorDetails(error: Error | HttpErrorResponse): string {
    const details: string[] = [
      '=== Demo Error Details ===',
      `Type: ${error.constructor.name}`,
      `Message: ${error.message}`
    ];

    if (error instanceof HttpErrorResponse) {
      details.push(
        '=== HTTP Details ===',
        `Status: ${error.status} ${error.statusText}`,
        `URL: ${error.url}`,
        '=== Request Details ===',
        `Method: ${error.error?.method || 'N/A'}`,
        `Headers: ${JSON.stringify(error.headers, null, 2)}`
      );
    }

    if ('stack' in error && error.stack) {
      details.push('=== Stack Trace ===', error.stack);
    }

    return details.join('\n');
  }
}