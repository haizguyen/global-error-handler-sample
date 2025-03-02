
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { GlobalErrorHandlerModule } from './global-error-handler/global-error-handler.module';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent, DemoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    GlobalErrorHandlerModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    MatButtonModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
