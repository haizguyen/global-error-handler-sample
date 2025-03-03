import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogStatus } from '../store/log.actions';
import { INotificationService } from './notification.interface';

@Injectable({ providedIn: 'root' })
export class MaterialNotificationService implements INotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showToast(message: string, status: LogStatus) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [`${status}-snackbar`],
    });
  }

  showPopup(message: string, status: LogStatus) {
    Swal.fire({
      title: status.toUpperCase(),
      text: message,
      icon: status,
      confirmButtonText: 'OK',
    });
  }
}