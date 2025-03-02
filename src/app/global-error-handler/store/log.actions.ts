
import { createAction, props } from '@ngrx/store';

export type LogStatus = 'success' | 'warning' | 'info' | 'error';

export interface LogOptions {
  toast?: boolean;
  popup?: boolean;
  onlyLog?: boolean;
}

export const writeLog = createAction(
  '[Log] Write Log',
  props<{
    message: string;
    stack?: string;
    timestamp: Date;
    status: LogStatus;
    options?: LogOptions;
  }>()
);
