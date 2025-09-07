import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private defaultDuration = 3000;

  constructor(private snackBar: MatSnackBar) {}

  open(message: string, action = 'OK', config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, {
      duration: this.defaultDuration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      ...config,
    });
  }

  success(message: string, action = 'OK', config?: MatSnackBarConfig) {
    this.open(message, action, {
      panelClass: ['snackbar-success'],
      ...config,
    });
  }

  error(message: string, action = 'Zamknij', config?: MatSnackBarConfig) {
    this.open(message, action, {
      duration: this.defaultDuration * 2,
      panelClass: ['snackbar-error'],
      ...config,
    });
  }
}
