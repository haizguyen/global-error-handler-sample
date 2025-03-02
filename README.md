# Global Error Handler Sample

A comprehensive error handling solution for Angular applications, demonstrating best practices and modern architectural patterns.

## Features

- Global error handling with custom error types
- Toast and popup notifications for errors
- Error boundary components for UI error containment
- HTTP error interceptor with retry mechanisms
- Rate limiting protection
- Error recovery demonstrations
- Integration with NgRx for state management

## Project Structure

```
src/app/
├── global-error-handler/
│   ├── config/
│   │   └── error-handler.config.ts    # Centralized error handling configuration
│   ├── models/
│   │   ├── error.model.ts            # Error types and interfaces
│   │   └── http-error.model.ts       # Custom HTTP error classes
│   ├── services/
│   │   ├── base-api.service.ts       # Base service with error handling
│   │   ├── error-handler.service.ts  # Core error handling logic
│   │   └── custom-error-handler.ts   # Global error handler implementation
│   ├── error-boundary/
│   │   └── error-boundary.component.ts # UI error containment
│   └── decorators/
│       └── handle-error.decorator.ts  # Error handling decorators
└── features/
    └── user/                         # Example feature with error handling
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the application:
```bash
ng serve
```

3. Navigate to `http://localhost:4200`

## Implementation Examples

### 1. Base API Service Usage

```typescript
@Injectable()
export class UserService extends BaseApiService {
  getUsers(): Observable<User[]> {
    return this.get<User[]>('/api/users', {
      retries: 2,         // Retry failed requests twice
      timeoutMs: 10000,   // 10 second timeout
      suppressError: false // Show error notifications
    });
  }
}
```

### 2. Error Boundary Implementation

```typescript
// In your component template
<app-error-boundary fallback="Failed to load user data">
  <app-user-list></app-user-list>
</app-error-boundary>

// Error boundary usage with custom error handling
<app-error-boundary 
  [fallback]="errorMessage"
  (retry)="handleRetry()">
  <app-sensitive-component></app-sensitive-component>
</app-error-boundary>
```

### 3. Custom Error Handling

```typescript
// Custom error response
interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp?: string;
}

// Error handler service usage
this.errorHandler.handleError(
  'Operation Name',
  error,
  { additionalContext: 'value' }
);
```

## Error Scenarios

### 1. Network Errors
```typescript
// Simulate network error
simulateNetworkError(): Observable<any> {
  return this.get('https://invalid-domain-xyz.com/api', {
    retries: 0 // No retries for quick failure
  });
}
```

### 2. Rate Limiting
```typescript
// Rate limit protection
simulateRateLimit(): Observable<any> {
  return timer(0, 100).pipe(
    mergeMap(() => 
      this.get('https://api.example.com/rate-limited', {
        suppressError: true,
        retries: 0
      })
    )
  );
}
```

### 3. Error Recovery
```typescript
// Automatic retry with recovery
simulateRecovery(): Observable<any> {
  return this.get('https://api.example.com/intermittent', {
    retries: 3,
    timeoutMs: 1000
  });
}
```

## Error Handler Configuration

```typescript
// In main.ts
bootstrapApplication(AppComponent, {
  providers: [
    ...ErrorHandlerProviders,
    provideHttpClient(),
    { 
      provide: ErrorHandler, 
      useClass: CustomErrorHandler 
    }
  ]
});
```

## Built-in Error Messages

```typescript
export const ErrorMessages = {
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  INVALID_REQUEST: 'Invalid request. Please check your input and try again.',
  UNAUTHORIZED: 'Your session has expired. Please log in again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An internal server error occurred. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
};
```

## Best Practices

1. Error Handling
   - Use type-safe error handling
   - Provide user-friendly messages
   - Log technical details for debugging
   - Implement retry mechanisms where appropriate

2. UI/UX
   - Show loading states during retries
   - Provide clear error messages
   - Offer recovery options when possible
   - Use error boundaries for component isolation

3. Monitoring
   - Log all API errors
   - Track error frequency and patterns
   - Monitor retry attempts
   - Record error recovery success rates

## Testing

The demo includes various error scenarios that can be tested:

1. Click "Trigger HTTP Error" to simulate a connection timeout
2. Click "Network Error" to simulate DNS/connectivity issues
3. Click "Auth Error" to simulate 401 unauthorized responses
4. Click "Server Error" to test retry mechanisms
5. Click "Rate Limit" to see rate limiting protection in action
6. Click "Error Recovery" to test automatic recovery

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
