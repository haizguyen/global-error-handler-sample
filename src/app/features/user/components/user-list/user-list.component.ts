import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import * as UserActions from '../../store/user.actions';
import * as UserSelectors from '../../store/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'createdAt', 'actions'];

  constructor(private store: Store) {
    this.users$ = this.store.select(UserSelectors.selectUsers);
    this.loading$ = this.store.select(UserSelectors.selectLoading);
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  updateUser(user: User): void {
    const updatedUser = { ...user, active: !user.active };
    this.store.dispatch(UserActions.updateUser({ user: updatedUser }));
  }

  deleteUser(id: number): void {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }
}