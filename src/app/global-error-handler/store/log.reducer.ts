
import { createReducer, on } from '@ngrx/store';
import { writeLog, LogStatus, LogOptions } from './log.actions';

export interface LogEntry {
  message: string;
  stack?: string;
  timestamp: Date;
  status: LogStatus;
  options?: LogOptions;
}

export interface LogState {
  logs: LogEntry[];
}

export const initialState: LogState = {
  logs: [],
};

export const logReducer = createReducer(
  initialState,
  on(writeLog, (state, log) => ({
    ...state,
    logs: [...state.logs, log],
  }))
);
