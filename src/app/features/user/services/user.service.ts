import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/userss';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set('X-Error-Handled', 'true');
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
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
    const headers = new HttpHeaders().set('X-Error-Handled', 'true');
    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders().set('X-Error-Handled', 'true');
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user, { headers });
  }

  deleteUser(id: number): Observable<void> {
    const headers = new HttpHeaders().set('X-Error-Handled', 'true');
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}