
import { Component } from '@angular/core';
import { LogService } from '../global-error-handler/services/log.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  constructor(private logService: LogService) {}

  logSuccess() {
    this.logService.log('This is a success message!', 'success', undefined, { toast: true });
  }

  logError() {
    this.logService.log('This is an error message!', 'error', undefined, { popup: true });
  }

  throwError() {
    throw new Error('This is a simulated error!');
  }
}
