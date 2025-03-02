
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { logReducer } from './store/log.reducer';
import { LogEffects } from './store/log.effects';
import { ApiLoggingInterceptor } from './interceptors/api-logging.interceptor';

@NgModule({
  imports: [
    StoreModule.forFeature('log', logReducer),
    EffectsModule.forFeature([LogEffects]),
    MatSnackBarModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiLoggingInterceptor,
      multi: true,
    },
  ],
})
export class GlobalErrorHandlerModule {}
