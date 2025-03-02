import { Component } from '@angular/core';
import { LogService } from '../global-error-handler/services/log.service';
import { ErrorDemoService } from './services/error-demo.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
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

  triggerHttpError() {
    this.errorDemoService.simulateHttpError().subscribe({
      next: () => {},
      error: (error) => {
        debugger
        this.logService.log(
          'HTTP request failed!', 
          'error', 
          error, 
          { toast: true }
        );
        console.log('HTTP error caught in component:', error);
      }
    });
  }

  triggerDirectError() {
    this.errorDemoService.simulateDirectError().subscribe({
      next: () => {},
      error: (error) => {
        this.logService.log(
          'Direct API error occurred!', 
          'error', 
          error, 
          { toast: false }
        );
        console.log('Direct error caught in component:', error);
      }
    });
  }
}
