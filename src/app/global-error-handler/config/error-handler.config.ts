import { ErrorHandler } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LogService } from '../services/log.service';
import { NotificationService } from '../services/notification.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { CustomErrorHandler } from '../services/custom-error-handler';

export const ErrorHandlerProviders = [
  LogService,
  NotificationService,
  ErrorHandlerService,
  { provide: ErrorHandler, useClass: CustomErrorHandler },
  importProvidersFrom(
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule
  )
];