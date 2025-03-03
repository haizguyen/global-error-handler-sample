import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { LogService } from '../../../global-error-handler/services/log.service';
import { ErrorHandlerService } from '../../../global-error-handler/services/error-handler.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(() => this.userService.getUsers()
      .pipe(
        map(users => UserActions.loadUsersSuccess({ users })),
        catchError(error => {
          this.errorHandler.handleError('GET /users', error);
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
          this.errorHandler.handleError('POST /users', error, { user });
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
          this.errorHandler.handleError(`PUT /users/${user.id}`, error, { user });
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
          this.errorHandler.handleError(`DELETE /users/${id}`, error, { id });
          return of(UserActions.loadUsersFailure({ error }));
        })
      ))
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private logService: LogService,
    private errorHandler: ErrorHandlerService
  ) {}
}