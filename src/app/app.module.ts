import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { userReducer } from './features/user/store/user.reducer';
import { UserEffects } from './features/user/store/user.effects';
import { GlobalErrorHandlerModule } from './global-error-handler/global-error-handler.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: userReducer
    }),
    EffectsModule.forRoot([UserEffects]),
    GlobalErrorHandlerModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, connectInZone: true })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
