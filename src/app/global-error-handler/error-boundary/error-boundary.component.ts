import { Component, Input, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-boundary',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div *ngIf="error" class="error-boundary">
      <h3>Something went wrong</h3>
      <p>{{ errorMessage }}</p>
      <button mat-raised-button color="primary" (click)="retry()">
        Try Again
      </button>
    </div>
    <ng-content *ngIf="!error"></ng-content>
  `,
  styles: [`
    .error-boundary {
      padding: 20px;
      border: 1px solid #f44336;
      border-radius: 4px;
      margin: 10px 0;
      background: #ffebee;
      text-align: center;
    }
  `]
})
export class ErrorBoundaryComponent {
  @Input() fallback?: string;
  
  error: Error | null = null;
  errorMessage: string = '';

  retry() {
    this.error = null;
    this.errorMessage = '';
  }

  handleError(error: Error) {
    this.error = error;
    this.errorMessage = this.fallback || 'An unexpected error occurred.';
  }
}