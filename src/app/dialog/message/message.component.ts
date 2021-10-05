import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  data: any;
  constructor(
    private dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.data = data;
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

}
