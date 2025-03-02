
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { writeLog, LogStatus, LogOptions } from '../store/log.actions';

@Injectable({ providedIn: 'root' })
export class LogService {
  constructor(private store: Store) {}

  log(message: string, status: LogStatus = 'info', stack?: string, options?: LogOptions) {
    this.store.dispatch(
      writeLog({
        message,
        stack,
        timestamp: new Date(),
        status,
        options,
      })
    );
  }
}
