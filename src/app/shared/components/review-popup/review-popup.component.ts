import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Service } from '../../models/service.model';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-review-popup',
  templateUrl: './review-popup.component.html',
  styleUrls: ['./review-popup.component.css']
})
export class ReviewPopupComponent implements OnInit {


  formData = new FormGroup({
    rating: new FormControl(),
    comment: new FormControl('')
  });

  isLoading: boolean = false;

  
  constructor(private apiClient: ApiClientService, private snackBar: MatSnackBar, private router: Router,
    public dialogRef: MatDialogRef<ReviewPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  /**
   * Submitting the form (service creation in backend)
   */
  onSubmit() {
    // First make sure the form is valid
    if(this.formData.valid) {
      // Now make sure all the form controls have values
      if(this.formData.controls.rating.value
        && this.formData.controls.comment.value) {
        this.isLoading = true;
        let ratingParam = this.formData.controls.rating.value;
        let commentParam = this.formData.controls.comment.value;
        console.log(ratingParam);
        console.log(commentParam)
        this.apiClient.putReview(this.data._id!, ratingParam, commentParam).subscribe({
          next: (res) => {
            if(res.success) {
              this.apiClient.initializeData();
              this.dialogRef.close();
              this.snackBar.open("Review Success", "", {
                duration: 1000,
                panelClass: ['green-snackbar'],
              });
            } else {
              alert("API did not return a successful posting");
              this.isLoading = false;
              this.dialogRef.close();
            }
          }, error: (err) => {
            alert("Error posting review, see console for details");
            console.log(err);
            this.isLoading = false;
            this.dialogRef.close();
          }
        })
      }
    }
  }
}
