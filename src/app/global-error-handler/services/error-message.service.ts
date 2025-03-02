import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCode, ErrorMessages, mapHttpStatusToErrorCode } from '../models/error.model';

/**
 * @deprecated Use ErrorHandlerService instead. This service will be removed in future versions.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  getFriendlyMessage(error: HttpErrorResponse): string {
    const errorCode = mapHttpStatusToErrorCode(error.status);
    return ErrorMessages[errorCode];
  }

  getDetailedErrorMessage(operation: string, error: HttpErrorResponse, params?: any): string {
    console.warn('ErrorMessageService is deprecated. Please use ErrorHandlerService instead.');
    const friendlyMessage = this.getFriendlyMessage(error);
    let message = `[API ERROR] ${operation}\nMessage: ${friendlyMessage}`;
    
    if (params) {
      message += `\nParams: ${JSON.stringify(params, null, 2)}`;
    }
    
    message += `\nStatus: ${error.status}`;
    if (error.error?.message) {
      message += `\nServer Message: ${error.error.message}`;
    }
    
    return message;
  }
}