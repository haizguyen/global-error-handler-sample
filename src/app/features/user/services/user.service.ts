import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/userss';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'User', // Default role since API doesn't provide this
        active: true, // Default status since API doesn't provide this
        createdAt: new Date() // Using current date since API doesn't provide this
      })))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}