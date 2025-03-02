import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LogService } from '../services/log.service';
import { ErrorMessageService } from '../services/error-message.service';

@Injectable()
export class ApiLoggingInterceptor implements HttpInterceptor {
  constructor(
    private logService: LogService,
    private errorMessageService: ErrorMessageService
  ) {}

  private getRequestDetails(req: HttpRequest<any>): string {
    let details = `${req.method} ${req.url}`;

    // Add query params if they exist
    if (req.params.keys().length > 0) {
      const params = req.params.keys()
        .map(key => `${key}=${req.params.get(key)}`)
        .join('&');
      details += `?${params}`;
    }

    // Add body for POST/PUT requests
    if (req.body && (req.method === 'POST' || req.method === 'PUT')) {
      details += `\nBody: ${JSON.stringify(req.body, null, 2)}`;
    }

    return details;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    const isErrorHandled = req.headers.has('X-Error-Handled');
    const requestDetails = this.getRequestDetails(req);

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            this.logService.log(
              `[API SUCCESS] ${requestDetails} (${elapsed} ms)`, 
              'success', 
              undefined, 
              { onlyLog: true }
            );
          }
        },
        error: (error: HttpErrorResponse) => {
          // Skip logging if error is handled by effects
          if (!isErrorHandled) {
            const elapsed = Date.now() - started;
            const errorMessage = this.errorMessageService.getDetailedErrorMessage(
              requestDetails,
              error,
              req.body
            );
            this.logService.log(
              errorMessage,
              'error',
              (error as any).stack,
              { onlyLog: true }
            );
          }
        },
      })
    );
  }
}
