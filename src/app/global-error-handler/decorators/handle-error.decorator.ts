import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler.service';

export function HandleError(operation: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // Get error handler from instance
      const instance: any = this;
      const errorHandler = instance.errorHandler as ErrorHandlerService;
      
      if (!errorHandler) {
        console.error('ErrorHandlerService not injected in the component/service');
        return originalMethod.apply(this, args);
      }

      try {
        const result = originalMethod.apply(this, args);
        // Handle if the result is an Observable
        if (result && result instanceof Observable) {
          return result.pipe(
            catchError((error: HttpErrorResponse) => {
              errorHandler.handleHttpError(operation, error, { args }).subscribe();
              return of(null); // Return empty observable after handling error
            })
          );
        }
        return result;
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          errorHandler.handleHttpError(operation, error, { args }).subscribe();
          return of(null); // Return empty observable for synchronous errors
        }
        throw error; // Re-throw non-HTTP errors
      }
    };

    return descriptor;
  };
}