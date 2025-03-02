import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { userReducer } from './app/features/user/store/user.reducer';
import { UserEffects } from './app/features/user/store/user.effects';
import { ErrorHandlerProviders } from './app/global-error-handler/config/error-handler.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideStore({
      user: userReducer
    }),
    provideEffects([UserEffects]),
    provideStoreDevtools({
      maxAge: 25
    }),
    ...ErrorHandlerProviders
  ]
}).catch(err => console.error(err));
