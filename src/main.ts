import { ErrorHandler, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { userReducer } from './app/features/user/store/user.reducer';
import { UserEffects } from './app/features/user/store/user.effects';
import { GlobalErrorHandlerModule } from './app/global-error-handler/global-error-handler.module';
import { DemoErrorHandler } from './app/demo/services/demo-error-handler';
import { logReducer } from './app/global-error-handler/store/log.reducer';
import { LogEffects } from './app/global-error-handler/store/log.effects';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(GlobalErrorHandlerModule),
    {
      provide: ErrorHandler,
      useClass: DemoErrorHandler
    },
    provideAnimations(),
    provideHttpClient(),
    provideStore({
      user: userReducer,
      log: logReducer
    }),
    provideEffects([
      UserEffects,
      LogEffects
    ]),
    provideStoreDevtools({
      maxAge: 25,
      connectInZone: true
    })
  ]
}).catch(err => console.error(err));
