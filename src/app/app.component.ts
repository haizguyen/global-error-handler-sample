import { Component } from '@angular/core';
import { DemoComponent } from './demo/demo.component';

@Component({
  selector: 'app-root',
  template: '<app-demo></app-demo>',
  standalone: true,
  imports: [DemoComponent]
})
export class AppComponent {
}
