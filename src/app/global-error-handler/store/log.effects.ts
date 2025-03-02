
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { writeLog } from './log.actions';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class LogEffects {
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

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}
