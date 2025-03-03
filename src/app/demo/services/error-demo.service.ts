import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BaseApiService } from '../../global-error-handler/services/base-api.service';
import { LogService } from '../../global-error-handler/services/log.service';
import { ErrorHandlerService } from '../../global-error-handler/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorDemoService extends BaseApiService {
  constructor(
    http: HttpClient,
    logService: LogService,
    errorHandler: ErrorHandlerService
  ) {
    super(http, logService, errorHandler);
  }

  // Test various error scenarios
  simulateHttpError(): Observable<any> {
    // Test connection timeout
    return this.get('https://api.example.com/timeout', {
      timeoutMs: 2000, // Short timeout
      retries: 1
    });
  }

  simulateNetworkError(): Observable<any> {
    // Invalid domain to trigger network error
    return this.get('https://invalid-domain-xyz.com/api', {
      retries: 0 // No retries for quick failure
    });
  }

  simulateAuthError(): Observable<any> {
    // Test 401 unauthorized
    return this.get('https://api.example.com/unauthorized', {
      suppressError: false,
      retries: 0
    });
  }

  simulateServerError(): Observable<any> {
    // Test 500 server error with retries
    return this.get('https://api.example.com/server-error', {
      retries: 2,
      timeoutMs: 5000
    });
  }

  simulateValidationError(): Observable<any> {
    // Test 400 bad request with validation errors
    return this.post('https://api.example.com/validate', {
      invalidField: 'test'
    });
  }

  // Simulate rate limiting with multiple rapid requests
  simulateRateLimit(): Observable<any> {
    return timer(0, 100).pipe(
      mergeMap(() => 
        this.get('https://api.example.com/rate-limited', {
          suppressError: true,
          retries: 0
        })
      )
    );
  }

  // Test error recovery
  simulateRecovery(): Observable<any> {
    // This will fail twice but succeed on third try
    return this.get('https://api.example.com/intermittent', {
      retries: 3,
      timeoutMs: 1000
    });
  }
}