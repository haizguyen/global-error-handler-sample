import { Component } from '@angular/core';
import { LogService } from '../global-error-handler/services/log.service';
import { ErrorDemoService } from './services/error-demo.service';
import { ErrorMessageService } from '../global-error-handler/services/error-message.service';
import { ErrorHandlerService } from '../global-error-handler/services/error-handler.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  constructor(
    private logService: LogService,
    private errorDemoService: ErrorDemoService,
    private errorHandler: ErrorHandlerService
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
    this.errorDemoService.simulateHttpError()
      .pipe(
        catchError(error => {
          return of(null); // Prevent the error from propagating after handling
        })
      )
      .subscribe();
  }

  triggerDirectError() {
    this.errorDemoService.simulateDirectError()
      .pipe(
        catchError(error => {
          return of(null); // Prevent the error from propagating after handling
        })
      )
      .subscribe();
  }
}
