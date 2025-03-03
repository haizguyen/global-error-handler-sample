import { Injectable, InjectionToken } from '@angular/core';
import { LogStatus } from '../store/log.actions';

export interface INotificationService {
  showToast(message: string, status: LogStatus): void;
  showPopup(message: string, status: LogStatus): void;
}

export const NOTIFICATION_SERVICE = new InjectionToken<INotificationService>('NOTIFICATION_SERVICE');

@Injectable({ providedIn: 'root' })
export class DefaultNotificationService implements INotificationService {
  showToast(message: string, status: LogStatus): void {
    console.log(`[${status.toUpperCase()}] Toast: ${message}`);
  }

  showPopup(message: string, status: LogStatus): void {
    console.log(`[${status.toUpperCase()}] Popup: ${message}`);
  }
}