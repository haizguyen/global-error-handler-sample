import { Component } from '@angular/core';
import { LogService } from '../global-error-handler/services/log.service';
import { ErrorDemoService } from './services/error-demo.service';
import { ErrorMessageService } from '../global-error-handler/services/error-message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  constructor(
    private logService: LogService,
    private errorDemoService: ErrorDemoService,
    private errorMessageService: ErrorMessageService
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

  triggerHttpError() {
    this.errorDemoService.simulateHttpError().subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        const friendlyMessage = this.errorMessageService.getFriendlyMessage(error);
        this.logService.log(
          friendlyMessage,
          'error',
          this.errorMessageService.getDetailedErrorMessage('GET /non-existent-endpoint', error),
          { toast: true }
        );
      }
    });
  }

  triggerDirectError() {
    this.errorDemoService.simulateDirectError().subscribe({
      next: () => {},
      error: (error: Error) => {
        this.logService.log(
          error.message,
          'error',
          error.stack,
          { toast: true }
        );
      }
    });
  }
}
