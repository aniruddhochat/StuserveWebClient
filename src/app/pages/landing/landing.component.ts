import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpTypeSelectComponent } from 'src/app/shared/components/sign-up-type-select/sign-up-type-select.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  signUpClick() {
    let dialogRef = this.dialog.open(SignUpTypeSelectComponent, {
      height: 'fit-content',
      width: '750px',
    });
  }
}
