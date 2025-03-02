import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { GlobalErrorHandlerModule } from './global-error-handler/global-error-handler.module';
import { CustomErrorHandler } from './global-error-handler/services/custom-error-handler';
import { userReducer } from './features/user/store/user.reducer';
import { UserEffects } from './features/user/store/user.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: userReducer
    }),
    EffectsModule.forRoot([UserEffects]),
    GlobalErrorHandlerModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    // Import standalone components
    DemoComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
