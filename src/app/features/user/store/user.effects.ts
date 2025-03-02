import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { LogService } from '../../../global-error-handler/services/log.service';
import { ErrorMessageService } from '../../../global-error-handler/services/error-message.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(() => this.userService.getUsers()
      .pipe(
        map(users => UserActions.loadUsersSuccess({ users })),
        catchError(error => {
          this.logService.log(
            this.errorMessageService.getDetailedErrorMessage('GET /users', error),
            'error',
            error,
            { popup: true }
          );
          return of(UserActions.loadUsersFailure({ error }));
        })
      ))
  ));

  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.addUser),
    mergeMap(({ user }) => this.userService.addUser(user)
      .pipe(
        map(() => {
          this.logService.log(
            'User added successfully',
            'success',
            undefined,
            { toast: true }
          );
          return UserActions.loadUsers();
        }),
        catchError(error => {
          this.logService.log(
            this.errorMessageService.getDetailedErrorMessage('POST /users', error, { user }),
            'error',
            error,
            { toast: true }
          );
          return of(UserActions.loadUsersFailure({ error }));
        })
      ))
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateUser),
    mergeMap(({ user }) => this.userService.updateUser(user)
      .pipe(
        map(() => {
          this.logService.log(
            'User updated successfully',
            'success',
            undefined,
            { toast: true }
          );
          return UserActions.loadUsers();
        }),
        catchError(error => {
          this.logService.log(
            this.errorMessageService.getDetailedErrorMessage(`PUT /users/${user.id}`, error, { user }),
            'error',
            error,
            { toast: true }
          );
          return of(UserActions.loadUsersFailure({ error }));
        })
      ))
  ));

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.deleteUser),
    mergeMap(({ id }) => this.userService.deleteUser(id)
      .pipe(
        map(() => {
          this.logService.log(
            'User deleted successfully',
            'success',
            undefined,
            { toast: true }
          );
          return UserActions.loadUsers();
        }),
        catchError(error => {
          this.logService.log(
            this.errorMessageService.getDetailedErrorMessage(`DELETE /users/${id}`, error, { id }),
            'error',
            error,
            { toast: true }
          );
          return of(UserActions.loadUsersFailure({ error }));
        })
      ))
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private logService: LogService,
    private errorMessageService: ErrorMessageService
  ) {}
}