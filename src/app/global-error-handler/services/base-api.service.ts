import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { ErrorCode, ErrorResponse, mapHttpStatusToErrorCode } from '../models/error.model';
import { LogService } from './log.service';

@Injectable()
export abstract class BaseApiService {
  protected constructor(
    protected http: HttpClient,
    protected logService: LogService
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
      catchError((error: HttpErrorResponse) => this.handleError(error, suppressError))
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

  private handleError(error: HttpErrorResponse, suppressError: boolean): Observable<never> {
    const errorCode = mapHttpStatusToErrorCode(error.status);
    const errorResponse: ErrorResponse = {
      error: {
        code: errorCode,
        message: error.message,
        details: error.error,
        timestamp: new Date().toISOString()
      },
      friendlyMessage: this.getFriendlyMessage(error),
      technicalDetails: this.getTechnicalDetails(error)
    };

    if (!suppressError) {
      this.logService.log(
        errorResponse.friendlyMessage,
        'error',
        errorResponse.technicalDetails,
        { toast: true }
      );
    }

    return throwError(() => errorResponse);
  }

  private getFriendlyMessage(error: HttpErrorResponse): string {
    if (!navigator.onLine) {
      return 'Please check your internet connection and try again.';
    }

    switch (error.status) {
      case 0:
        return 'Unable to connect to the server. Please try again later.';
      case 400:
        return this.getBadRequestMessage(error);
      case 401:
        return 'Your session has expired. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 408:
        return 'The request timed out. Please try again.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'An internal server error occurred. Please try again later.';
      default:
        return error.error?.message || 'An unexpected error occurred.';
    }
  }

  private getBadRequestMessage(error: HttpErrorResponse): string {
    if (error.error?.errors) {
      // Handle validation errors
      const validationErrors = Object.values(error.error.errors);
      if (validationErrors.length > 0) {
        return validationErrors.join('. ');
      }
    }
    return 'Invalid request. Please check your input and try again.';
  }

  private getTechnicalDetails(error: HttpErrorResponse): string {
    const details = [
      `URL: ${error.url}`,
      `Status: ${error.status} ${error.statusText}`,
      `Time: ${new Date().toISOString()}`
    ];

    if (error.error?.message) {
      details.push(`Server Message: ${error.error.message}`);
    }

    if (error.error?.stack) {
      details.push(`Stack Trace: ${error.error.stack}`);
    }

    return details.join('\n');
  }
}