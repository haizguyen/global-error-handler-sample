import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../models/user.model';
import * as UserActions from '../../store/user.actions';
import * as UserSelectors from '../../store/user.selectors';
import { ErrorBoundaryComponent } from '../../../../global-error-handler/error-boundary/error-boundary.component';
import { AppState } from '../../store/user.reducer';

// Group Material imports
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MATERIAL_MODULES = [
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule
] as const;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    ErrorBoundaryComponent
  ]
})
export class UserListComponent implements OnInit {
  private readonly store = inject(Store<AppState>);
  
  users$ = this.store.select(UserSelectors.selectUsers);
  loading$ = this.store.select(UserSelectors.selectLoading);
  displayedColumns = ['id', 'name', 'email', 'role', 'status', 'createdAt', 'actions'] as const;

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