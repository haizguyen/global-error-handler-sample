import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { LogService } from '../services/log.service';

export const apiLoggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const logService = inject(LogService);
  const started = Date.now();
  const isErrorHandled = req.headers.has('X-Error-Handled');

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          logService.log(
            `[API SUCCESS] ${req.method} ${req.url} (${elapsed} ms)`,
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
          logService.log(
            `[API ERROR] ${req.method} ${req.url} (${elapsed} ms)\nStatus: ${error.status}\nMessage: ${error.message}`,
            'error',
            (error as any).stack,
            { onlyLog: true }
          );
        }
      }
    })
  );
};
