export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp?: string;
}

export interface ErrorResponse {
  error: ApiError;
  friendlyMessage: string;
  technicalDetails?: string;
}

export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  OFFLINE = 'OFFLINE',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}
 
export const ErrorMessages = {
  [ErrorCode.OFFLINE]: 'Please check your internet connection and try again.',
  [ErrorCode.NETWORK_ERROR]: 'Unable to connect to the server. Please check your internet connection.',
  [ErrorCode.INVALID_REQUEST]: 'Invalid request. Please check your input and try again.',
  [ErrorCode.UNAUTHORIZED]: 'Your session has expired. Please log in again.',
  [ErrorCode.FORBIDDEN]: 'You do not have permission to perform this action.',
  [ErrorCode.NOT_FOUND]: 'The requested resource was not found.',
  [ErrorCode.REQUEST_TIMEOUT]: 'The request timed out. Please try again.',
  [ErrorCode.TOO_MANY_REQUESTS]: 'Too many requests. Please wait a moment and try again.',
  [ErrorCode.SERVER_ERROR]: 'An internal server error occurred. Please try again later.',
  [ErrorCode.UNKNOWN_ERROR]: 'An unexpected error occurred.'
};

export const mapHttpStatusToErrorCode = (status: number): ErrorCode => {
  switch (status) {
    case 0:
      return ErrorCode.NETWORK_ERROR;
    case 400:
      return ErrorCode.INVALID_REQUEST;
    case 401:
      return ErrorCode.UNAUTHORIZED;
    case 403:
      return ErrorCode.FORBIDDEN;
    case 404:
      return ErrorCode.NOT_FOUND;
    case 408:
      return ErrorCode.REQUEST_TIMEOUT;
    case 429:
      return ErrorCode.TOO_MANY_REQUESTS;
    case 500:
      return ErrorCode.SERVER_ERROR;
    default:
      return ErrorCode.UNKNOWN_ERROR;
  }
};