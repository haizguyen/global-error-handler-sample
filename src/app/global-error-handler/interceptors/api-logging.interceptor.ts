
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LogService } from '../services/log.service';

@Injectable()
export class ApiLoggingInterceptor implements HttpInterceptor {
  constructor(private logService: LogService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            this.logService.log(`[API SUCCESS] ${req.method} ${req.url} (${elapsed} ms)`, 'success', undefined, { onlyLog: true });
          }
        },
        error: (error: HttpErrorResponse) => {
          const elapsed = Date.now() - started;
          this.logService.log(
            `[API ERROR] ${req.method} ${req.url} (${elapsed} ms) - Status: ${error.status} - ${error.message}`,
            'error',
            (error as any).stack,
            { onlyLog: true }
          );
        },
      })
    );
  }
}
