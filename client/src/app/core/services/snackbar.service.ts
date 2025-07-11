import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);

  error(mess: string){
    this.snackbar.open(mess, 'Close', {
      duration: 5000,
      panelClass: ['snack-error']
    })
  }

  success(mess: string){
    this.snackbar.open(mess, 'Close', {
      duration: 5000,
      panelClass: ['snack-success']
    })
  }
}
