import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FilterData } from 'src/app/pages/consumer-view-all/consumer-view-all.component';

@Component({
  selector: 'app-posted-service-popup',
  templateUrl: './posted-service-popup.component.html',
  styleUrls: ['./posted-service-popup.component.css']
})
export class PostedServicePopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PostedServicePopupComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    // Close the popup
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    // Close the popup
    this.dialogRef.close(true);
  }
}
