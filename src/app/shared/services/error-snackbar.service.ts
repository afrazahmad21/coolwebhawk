import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorSnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public showSnackBar(msg: string, msgType: string) {
    this.snackBar.open(msg, msgType, {
      duration: 5000,
    });
  }
}
