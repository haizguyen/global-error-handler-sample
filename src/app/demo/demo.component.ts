import { Component, ErrorHandler } from '@angular/core';
import { LogService } from '../global-error-handler/services/log.service';
import { ErrorDemoService } from './services/error-demo.service';
import { catchError } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ErrorBoundaryComponent } from '../global-error-handler/error-boundary/error-boundary.component';
import { UserListComponent } from '../features/user/components/user-list/user-list.component';
import { DemoErrorHandler } from './services/demo-error-handler';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ErrorBoundaryComponent,
    UserListComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: DemoErrorHandler }
  ]
})
export class DemoComponent {
  constructor(
    private logService: LogService,
    private errorDemoService: ErrorDemoService
  ) {}

  logSuccess() {
    this.logService.log('This is a success message!', 'success', undefined, { toast: true });
  }

  logError() {
    this.logService.log('This is an error message!', 'error', undefined, { popup: true });
  }

  throwError() {
    throw new Error('This is a simulated error!');
  }

  // Test various error scenarios
  triggerHttpError(): void {
    this.errorDemoService.simulateHttpError()
      .pipe(catchError(error => of(null)))
      .subscribe();
  }

  triggerNetworkError(): void {
    this.errorDemoService.simulateNetworkError()
      .pipe(catchError(error => of(null)))
      .subscribe();
  }

  triggerAuthError(): void {
    this.errorDemoService.simulateAuthError()
      .pipe(catchError(error => of(null)))
      .subscribe();
  }

  triggerServerError(): void {
    this.errorDemoService.simulateServerError()
      .pipe(catchError(error => of(null)))
      .subscribe();
  }

  triggerValidationError(): void {
    this.errorDemoService.simulateValidationError()
      .pipe(catchError(error => of(null)))
      .subscribe();
  }

  triggerRateLimit(): void {
    const subscription: Subscription = this.errorDemoService.simulateRateLimit()
      .pipe(catchError(error => of(null)))
      .subscribe({
        error: () => subscription.unsubscribe(),
        complete: () => subscription.unsubscribe()
      });
  }

  testErrorRecovery(): void {
    this.errorDemoService.simulateRecovery()
      .pipe(catchError(error => of(null)))
      .subscribe({
        next: (result) => {
          if (result) {
            this.logService.log(
              'Successfully recovered from error!',
              'success',
              undefined,
              { toast: true }
            );
          }
        }
      });
  }
}
