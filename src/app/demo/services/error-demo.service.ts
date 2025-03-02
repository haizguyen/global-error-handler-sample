import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from '../../global-error-handler/services/error-handler.service';
import { SimulatedHttpError } from '../../global-error-handler/models/http-error.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorDemoService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  simulateHttpError(): Observable<any> {
    const headers = new HttpHeaders().set('X-Error-Handled', 'true');
    return this.http.get('https://api.example.com/non-existent-endpoint', { headers });
  }

  simulateDirectError(): Observable<any> {
    const headers = new HttpHeaders().set('X-Error-Handled', 'true');
    return new Observable(subscriber => {
      setTimeout(() => {
        const error = new SimulatedHttpError(
          'Internal Server Error',
          500,
          'Internal Server Error',
          'https://api.example.com/simulated-error',
          { message: 'Simulated server error occurred' }
        );
        subscriber.error(error);
      }, 100);
    });
  }

  private handleApiError(error: HttpErrorResponse | SimulatedHttpError, operation: string) {
    return this.errorHandler.handleError(operation, error as HttpErrorResponse);
  }
}