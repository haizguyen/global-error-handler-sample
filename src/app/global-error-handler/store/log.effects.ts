import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { writeLog } from './log.actions';
import { tap } from 'rxjs/operators';
import { INotificationService, NOTIFICATION_SERVICE } from '../services/notification.interface';

@Injectable()
export class LogEffects {
  constructor(
    private actions$: Actions,
    @Inject(NOTIFICATION_SERVICE) private notificationService: INotificationService
  ) {}

  writeLog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(writeLog),
        tap(({ message, status, options }) => {
          if (options?.toast) this.notificationService.showToast(message, status);
          if (options?.popup) this.notificationService.showPopup(message, status);
        })
      ),
    { dispatch: false }
  );
}
