import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConsumerAccount } from 'src/app/shared/models/consumer-account.model';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  formDisabled: boolean = true;
  isLoading: boolean = false;
  
 
  constructor(private apiClient: ApiClientService) { }

  account: ConsumerAccount | ProviderAccount = this.apiClient.consumerAccount ? this.apiClient.consumerAccount : this.apiClient.providerAccount;

  formData = new FormGroup({
    usernameControl: new FormControl(this.account.username),
    emailControl: new FormControl(this.account.email),
    passwordControl: new FormControl(this.apiClient.password),
    fnameControl: new FormControl(this.account.fname),
    lnameControl: new FormControl(this.account.lname),
    phoneControl: new FormControl(this.account.phone),
    yearControl: new FormControl(this.account.schoolyear),
    addressControl: new FormControl(this.account.address),
    zipcodeControl: new FormControl(this.account.pincode),
    currlocationControl: new FormControl(this.account.currlocation),
  })

  ngOnInit(): void {
    this.formData.disable();
  }

  /**
   * Submitting the form (service creation in backend)
   */
  onSubmit() {
    // // First make sure the form is valid
    // if(this.formData && this.formData.valid) {
    //   // Now make sure all the form controls have values
    //   if(this.formData.controls.nameControl.value
    //     && this.formData.controls.typeControl.value
    //     && this.formData.controls.categoryControl.value
    //     && this.formData.controls.descriptionControl.value
    //     && this.formData.controls.locationControl.value
    //     && this.formData.controls.priceControl.value) {
    //       // Start loading API
    //       this.isLoading = true;
    //       // Disable all form components
    //       this.formData.disable();
    //       this.tagList.disabled = true;
    //       // Set service values
    //       this.service.name = this.formData.controls.nameControl.value;
    //       this.service.description = this.formData.controls.descriptionControl.value;
    //       this.service.type = this.formData.controls.typeControl.value;
    //       this.service.price = this.formData.controls.priceControl.value;
    //       this.service.tags = this.tags;
    //       this.service.category = this.formData.controls.categoryControl.value;
    //       this.service.location = this.formData.controls.locationControl.value;
    //       // Now attempt to post the new service object through the API to the backend database
    //       this.apiClient.updateService(this.service).subscribe({
    //         next: (res: SingleServiceRequest) => {
    //           // Done loading (2 second timeout to show the progress spinner)
    //           setTimeout(() => {
    //             // Make sure the request sent back a success
    //             if(res.success) {
    //               this.snackBar.open("Successful Posting Service", "", {
    //                 duration: 1000,
    //                 panelClass: ['green-snackbar'],
    //               }).afterDismissed().subscribe(() => {
    //                 this.apiClient.initializeData();
    //                 // Done loading
    //                 this.isLoading = false;
    //                 // Navigate to home page
    //                 this.router.navigateByUrl("home/provider-home");
    //               });
                  
    //             } else {
    //               // Request did not send back a success, so alert user
    //               console.log("API request success variable returned false");
    //               // Done loading
    //               this.isLoading = false;
    //               // Display failure snackbar
    //               this.snackBar.open("Unsuccessful Posting Service", "", {
    //                 duration: 2000,
    //                 panelClass: ['red-snackbar'],
    //               });
    //             }
    //           }, 1000);
    //         },
    //         error: (err: any) => {
    //           // Done loading
    //           this.isLoading = false;
    //           // Alert user of error posting service
    //           console.log(err);
    //           alert("Something went wrong posting the service, check console for details.");
    //         }
    //       })
    //   } else {
    //     alert("Something went wrong getting the form values");
    //   }
    // } else {
    //   alert("Form is invalid");
    // }
  }

  onEnable() {
    // enable form
    this.formData.enable();
    this.formDisabled = false;
  }

  onCancel() {
    // reset form values and disable form
    this.formDisabled = true;
    // this.formData.reset({nameControl: this.service.name, typeControl: this.service.type, categoryControl: this.service.category, descriptionControl: this.service.description, locationControl: this.service.location, priceControl: this.service.price})
    this.formData.disable();
  }
}
