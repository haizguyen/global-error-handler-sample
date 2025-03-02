import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { ApiLoggingInterceptor } from './interceptors/api-logging.interceptor';
import { LogService } from './services/log.service';
import { NotificationService } from './services/notification.service';
import { ErrorMessageService } from './services/error-message.service';
import { logReducer } from './store/log.reducer';
import { LogEffects } from './store/log.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('log', logReducer),
    EffectsModule.forFeature([LogEffects]),
    SweetAlert2Module.forRoot()
  ],
  providers: [
    LogService,
    NotificationService,
    ErrorMessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiLoggingInterceptor,
      multi: true
    }
  ]
})
export class GlobalErrorHandlerModule { }
