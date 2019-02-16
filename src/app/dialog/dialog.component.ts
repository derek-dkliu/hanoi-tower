import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any) { }

  ngOnInit() {
  }

  nextLevel() {
    this.dialogRef.close({next: true});
  }

  tryAgain() {
    this.dialogRef.close({next: false});
  }
}
