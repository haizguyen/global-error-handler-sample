import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  getFriendlyMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'Unable to connect to the server. Please check your internet connection.';
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Unauthorized. Please log in again.';
      case 403:
        return 'Access denied. You do not have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 500:
        return 'Internal server error. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }

  getDetailedErrorMessage(operation: string, error: HttpErrorResponse, params?: any): string {
    const friendlyMessage = this.getFriendlyMessage(error);
    let message = `[API ERROR] ${operation}\nMessage: ${friendlyMessage}`;
    
    if (params) {
      message += `\nParams: ${JSON.stringify(params, null, 2)}`;
    }
    
    // Include technical details for debugging
    message += `\nStatus: ${error.status}`;
    if (error.error?.message) {
      message += `\nServer Message: ${error.error.message}`;
    }
    
    return message;
  }
}