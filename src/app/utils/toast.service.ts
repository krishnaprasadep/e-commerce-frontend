import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { SuccessMessageComponent } from '../components/success-message/success-message.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _snackBar = inject(MatSnackBar);

  constructor() {}

  show(msg: string, duration: number, type: string) {
    const comp =
      type === 'success' ? SuccessMessageComponent : ErrorMessageComponent;

    this._snackBar.openFromComponent(comp, {
      duration: duration * 1000,
      data: { message: msg },
      panelClass: type === 'success' ? 'toast-success' : 'toast-error',
    });
  }
}
