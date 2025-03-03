import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { userReducer } from './app/features/user/store/user.reducer';
import { UserEffects } from './app/features/user/store/user.effects';
import { ErrorHandlerProviders } from './app/global-error-handler/config/error-handler.config';
import { logReducer } from './app/global-error-handler/store/log.reducer';
import { LogEffects } from './app/global-error-handler/store/log.effects';
import { apiLoggingInterceptor } from './app/global-error-handler/interceptors/api-logging.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(
      withInterceptors([apiLoggingInterceptor])
    ),
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
    }),
    ...ErrorHandlerProviders
  ]
}).catch(err => console.error(err));
