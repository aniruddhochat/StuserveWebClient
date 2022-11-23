import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-sign-up-type-select',
  templateUrl: './sign-up-type-select.component.html',
  styleUrls: ['./sign-up-type-select.component.css']
})
export class SignUpTypeSelectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignUpTypeSelectComponent>) { }

  ngOnInit(): void {
  }

  consumerClick() {
    this.dialogRef.close();
  }

  providerClick() {
    this.dialogRef.close();
  }
}
