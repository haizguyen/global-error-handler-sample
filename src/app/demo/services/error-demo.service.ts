import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorDemoService {
  constructor(private http: HttpClient) {}

  // Simulating HTTP error by calling a non-existent endpoint
  simulateHttpError(): Observable<any> {
    return this.http.get('https://api.example.com/non-existent-endpoint');
  }

  // Alternative method using direct error throwing
  simulateDirectError(): Observable<any> {
    return throwError(() => new Error('API request failed with status 500'));
  }
}