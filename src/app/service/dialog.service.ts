import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../dialog/delete/delete.component';
import { LoadingComponent } from '../dialog/loading/loading.component';
import { MessageComponent } from '../dialog/message/message.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }


  openLoadingDialog() {
    setTimeout(() => {
      this.dialog.open(LoadingComponent, {
        disableClose: true,
      });
    });
  }

  openMessageDialog(jsonObj: any) {
    setTimeout(() => {
      this.dialog.open(MessageComponent, {
        data: jsonObj
      });
    });
  }

  openDeleteDialog(message: string) {
    setTimeout(() => {
      this.dialog.open(DeleteComponent, {
        data: message
      });
    });
  }

  closeDialog() {
    setTimeout(() => {
      this.dialog.closeAll();
    }, 2000);
  }


  closeDialogNow() {
    setTimeout(() => {
      this.dialog.closeAll();
    });
  }

}
