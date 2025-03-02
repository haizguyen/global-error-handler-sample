import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { BaseApiService } from '../../../global-error-handler/services/base-api.service';
import { LogService } from '../../../global-error-handler/services/log.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(
    http: HttpClient,
    logService: LogService
  ) {
    super(http, logService);
  }

  getUsers(): Observable<User[]> {
    return this.get<any[]>(this.apiUrl).pipe(
      map(users => users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'User',
        active: true,
        createdAt: new Date()
      })))
    );
  }

  addUser(user: User): Observable<User> {
    return this.post<User>(this.apiUrl, user, {
      retries: 2, // Retry twice for create operations
      timeoutMs: 10000 // 10 second timeout
    });
  }

  updateUser(user: User): Observable<User> {
    return this.put<User>(
      `${this.apiUrl}/${user.id}`,
      user,
      { retries: 1 }
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.delete<void>(
      `${this.apiUrl}/${id}`,
      { suppressError: false } // Show error notifications for delete operations
    );
  }
}