import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorDemoService {
  constructor(private http: HttpClient) {}

  // Simulating HTTP error by calling a non-existent endpoint
  simulateHttpError(): Observable<any> {
    const headers = new HttpHeaders().set('X-Error-Handled', 'true');
    return this.http.get('https://api.example.com/non-existent-endpoint', { headers });
  }

  // Alternative method using direct error throwing
  simulateDirectError(): Observable<any> {
    const headers = new HttpHeaders().set('X-Error-Handled', 'true');
    return throwError(() => new Error('API request failed with status 500'));
  }
}