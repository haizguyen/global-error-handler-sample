import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { apiLoggingInterceptor } from './interceptors/api-logging.interceptor';
import { LogService } from './services/log.service';
import { NotificationService } from './services/notification.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { logReducer } from './store/log.reducer';
import { LogEffects } from './store/log.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    LogService,
    NotificationService,
    ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useValue: apiLoggingInterceptor,
      multi: true
    }
  ]
})
export class GlobalErrorHandlerModule { }
