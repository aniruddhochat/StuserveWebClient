import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatLegacyChipInputEvent as MatChipInputEvent, MatLegacyChipList as MatChipList } from '@angular/material/legacy-chips';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { Service } from 'src/app/shared/models/service.model';
import { SingleServiceRequest } from 'src/app/shared/models/single-service-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {
  @ViewChild("chipList")
  tagList!: MatChipList;

  isLoading: boolean = false;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  tags: string[] = [];

  formDisabled: boolean = true;

  service: Service = this.router.getCurrentNavigation()!.extras.state as Service;

  constructor(public apiClient: ApiClientService, private snackBar: MatSnackBar, public dialog: MatDialog, private router: Router, private fb: FormBuilder) { 
  }

  formData = new FormGroup({
    nameControl: new FormControl(this.service.name),
    typeControl: new FormControl(this.service.type),
    categoryControl: new FormControl(this.service.category),
    descriptionControl: new FormControl(this.service.description),
    locationControl: new FormControl(this.service.location),
    priceControl: new FormControl(this.service.price),
  })

  ngOnInit(): void {
    this.formData.disable();
    this.tags = this.service.tags;
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
    if(this.formData && this.formData.valid) {
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
          // Set service values
          this.service.name = this.formData.controls.nameControl.value;
          this.service.description = this.formData.controls.descriptionControl.value;
          this.service.type = this.formData.controls.typeControl.value;
          this.service.price = this.formData.controls.priceControl.value;
          this.service.tags = this.tags;
          this.service.category = this.formData.controls.categoryControl.value;
          this.service.location = this.formData.controls.locationControl.value;
          // Now attempt to post the new service object through the API to the backend database
          this.apiClient.updateService(this.service).subscribe({
            next: (res: SingleServiceRequest) => {
              // Done loading (2 second timeout to show the progress spinner)
              setTimeout(() => {
                // Make sure the request sent back a success
                if(res.success) {
                  this.snackBar.open("Successful Posting Service", "", {
                    duration: 1000,
                    panelClass: ['green-snackbar'],
                  }).afterDismissed().subscribe(() => {
                    this.apiClient.initializeData();
                    // Done loading
                    this.isLoading = false;
                    // Navigate to home page
                    this.router.navigateByUrl("home/provider-home");
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

  onEnable() {
    // enable form
    this.formData.enable();
    this.formDisabled = false;
  }

  onCancel() {
    // reset form values and disable form
    this.formDisabled = true;
    this.formData.reset({nameControl: this.service.name, typeControl: this.service.type, categoryControl: this.service.category, descriptionControl: this.service.description, locationControl: this.service.location, priceControl: this.service.price})
    this.formData.disable();
  }
}
