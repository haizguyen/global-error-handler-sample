import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { LogService } from './log.service';

@Injectable()
export abstract class BaseApiService {
  protected constructor(
    protected http: HttpClient,
    protected logService: LogService,
    protected errorHandler: ErrorHandlerService
  ) {}

  protected createRequest<T>(
    method: string,
    url: string,
    options: {
      body?: any;
      params?: any;
      retries?: number;
      timeoutMs?: number;
      suppressError?: boolean;
    } = {}
  ): Observable<T> {
    const {
      body,
      params,
      retries = 1,
      timeoutMs = 30000,
      suppressError = false
    } = options;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Error-Handled', 'true');

    return this.http.request<T>(method, url, {
      body,
      headers,
      params
    }).pipe(
      timeout(timeoutMs),
      retry({ count: retries, delay: 1000 }), // Retry with 1 second delay
      catchError((error: HttpErrorResponse) => this.handleRequestError(method, url, error, suppressError))
    );
  }

  protected get<T>(url: string, options = {}): Observable<T> {
    return this.createRequest<T>('GET', url, options);
  }

  protected post<T>(url: string, body: any, options = {}): Observable<T> {
    return this.createRequest<T>('POST', url, { ...options, body });
  }

  protected put<T>(url: string, body: any, options = {}): Observable<T> {
    return this.createRequest<T>('PUT', url, { ...options, body });
  }

  protected delete<T>(url: string, options = {}): Observable<T> {
    return this.createRequest<T>('DELETE', url, options);
  }

  private handleRequestError(method: string, url: string, error: HttpErrorResponse, suppressError: boolean): Observable<never> {
    const operation = `${method} ${url}`;
    
    if (!suppressError) {
      if (!navigator.onLine) {
        return this.errorHandler.handleHttpError(operation, error, { isOffline: true });
      }

      // Special handling for validation errors
      if (error.status === 400 && error.error?.errors) {
        const validationErrors = Object.values(error.error.errors);
        if (validationErrors.length > 0) {
          const message = validationErrors.join('. ');
          return this.errorHandler.handleHttpError(operation, error, { validationErrors: message });
        }
      }

      return this.errorHandler.handleHttpError(operation, error);
    }

    // If error is suppressed, just return an error observable without logging
    return throwError(() => error);
  }
}