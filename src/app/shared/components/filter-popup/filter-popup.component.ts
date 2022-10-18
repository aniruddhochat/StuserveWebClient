import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterData } from '../../models/filter-data';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.css']
})
export class FilterPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FilterPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterData,
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
