import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostedServicePopupComponent } from 'src/app/shared/components/posted-service-popup/posted-service-popup.component';
import { Service } from 'src/app/shared/models/service.model';
import { SingleServiceRequest } from 'src/app/shared/models/single-service-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  @ViewChild("chipList")
  tagList!: MatChipList;

  formData = new FormGroup({
    nameControl: new FormControl(''),
    typeControl: new FormControl(''),
    categoryControl: new FormControl(''),
    descriptionControl: new FormControl(''),
    locationControl: new FormControl(''),
    priceControl: new FormControl(''),
  });

  isLoading: boolean = false;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  tags: string[] = [];

  constructor(public apiClient: ApiClientService, private snackBar: MatSnackBar, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Add function for the chip list
   */
   add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim().toLowerCase();
    // Add the input string
    if (value) {
      this.tags.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  /**
   * Remove function for the chip list
   */
  remove(value: string): void {
    const index = this.tags.indexOf(value);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  /**
   * Submitting the form (service creation in backend)
   */
  onSubmit() {
    // First make sure the form is valid
    if(this.formData.valid) {
      // Now make sure all the form controls have values
      if(this.formData.controls.nameControl.value
        && this.formData.controls.typeControl.value
        && this.formData.controls.categoryControl.value
        && this.formData.controls.descriptionControl.value
        && this.formData.controls.locationControl.value
        && this.formData.controls.priceControl.value) {
          // Start loading API
          this.isLoading = true;
          // Disable all form components
          this.formData.disable();
          this.tagList.disabled = true;
          // Create new service object
          let newService: Service = {
            name: this.formData.controls.nameControl.value,
            description: this.formData.controls.descriptionControl.value,
            type: this.formData.controls.typeControl.value,
            price: parseInt(this.formData.controls.priceControl.value),
            ratings: 0,
            tags: this.tags,
            images: [],
            category: this.formData.controls.categoryControl.value,
            numOfReviews: '0', 
            location: this.formData.controls.locationControl.value,
            reviews: [], // Currently empty because the API does not have a reviews endpoint ready
            user: this.apiClient.providerAccount._id!
          }
          // Now attempt to post the new service object through the API to the backend database
          this.apiClient.postServiceAdmin(newService).subscribe({
            next: (res: SingleServiceRequest) => {
              // Done loading (2 second timeout to show the progress spinner)
              setTimeout(() => {
                // Make sure the request sent back a success
                if(res.success) {
                  // Done loading
                  this.isLoading = false;
                  // Present popup to inform user that the service was succesfully posted, and prompt if they would like to enter another
                  let dialogRef = this.dialog.open(PostedServicePopupComponent, {
                    height: 'fit-content',
                    width: '750px',
                  });
                  // Close dialog and grab selections
                  dialogRef.afterClosed().subscribe((result: boolean) => {
                    if(result) {
                      // If the result is true, then the user selected to post another service
                      // So enable all form components and remain on page
                      this.formData.enable();
                      this.formData.reset();
                      this.tags = [];
                      this.tagList.disabled = false;
                    } else {
                      // If reesult boolean is false, then the user selected to not enter another service
                      // So just navigate the user to the provider home page
                      this.router.navigateByUrl("home/provider-home");
                    }
                  });
                } else {
                  // Request did not send back a success, so alert user
                  console.log("API request success variable returned false");
                  // Done loading
                  this.isLoading = false;
                  // Display failure snackbar
                  this.snackBar.open("Unsuccessful Posting Service", "", {
                    duration: 2000,
                    panelClass: ['red-snackbar'],
                  });
                }
              }, 1000);
            },
            error: (err: any) => {
              // Done loading
              this.isLoading = false;
              // Alert user of error posting service
              console.log(err);
              alert("Something went wrong posting the service, check console for details.");
            }
          })
      } else {
        alert("Something went wrong getting the form values");
      }
    } else {
      alert("Form is invalid");
    }
  }
}
