import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsumerAccount } from 'src/app/shared/models/consumer-account.model';
import { ConsumerRequest } from 'src/app/shared/models/consumer-request.model';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ProviderRequest } from 'src/app/shared/models/provider-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';
import { GeocodeService } from 'src/app/shared/services/geocode.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  @ViewChild("placesInput")
  placesInput!: ElementRef;
  
  formDisabled: boolean = true;
  isLoading: boolean = false;
 
  constructor(private apiClient: ApiClientService, private snackBar: MatSnackBar, private cloudService: CloudinaryService, private geoService: GeocodeService) { }

  // avatar: File

  isUser = this.apiClient.consumerAccount ? true : false;

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
  })

  ngOnInit(): void {
    this.formData.disable();
  }

  autocomplete() {
    this.geoService.setAutocomplete(this.placesInput.nativeElement);
  }

  /**
   * Submitting the form (service creation in backend)
   */
  onSubmit() {
    console.log(this.formData);
    // First make sure the form is valid
    if(this.formData.valid) {
      // Now make sure all the form controls have values
      if(this.formData.controls.fnameControl.value
        && this.formData.controls.lnameControl.value
        && this.formData.controls.emailControl.value
        && this.formData.controls.phoneControl.value
        && this.formData.controls.yearControl.value
        && this.formData.controls.addressControl.value){
          // Start loading API
          this.isLoading = true;
          // Disable all form components
          this.formData.disable();
          //this.interestList.disabled = true;
          if(this.isUser) {
            const newAccount: ConsumerAccount = {
              username: this.account.username,
              fname: this.formData.controls.fnameControl.value,
              lname: this.formData.controls.lnameControl.value,
              email: this.formData.controls.emailControl.value,
              phone: this.formData.controls.phoneControl.value,
              schoolyear: this.formData.controls.yearControl.value,
              address: this.placesInput.nativeElement.value,
              role: 'consumer'
            };
            this.apiClient.updateConsumer(newAccount).subscribe({
              next: (res: ConsumerRequest) => {
                console.log(res);
                this.apiClient.consumerAccount = res.user;
                this.account = res.user;
                this.isLoading = false;
                this.snackBar.open('Success', '', {
                  duration: 1000
                })
              }, error: (err: any) => {
                alert('Error updating profile, check console.');
                console.log(err);
              }
            });
          } else {
            const newAccount: ProviderAccount = {
              username: this.account.username,
              fname: this.formData.controls.fnameControl.value,
              lname: this.formData.controls.lnameControl.value,
              email: this.formData.controls.emailControl.value,
              phone: this.formData.controls.phoneControl.value,
              schoolyear: this.formData.controls.yearControl.value,
              address: this.placesInput.nativeElement.value,
              role: 'consumer',
              isApproved: (this.account as ProviderAccount).isApproved
            };
            this.apiClient.updateProvider(newAccount).subscribe({
              next: (res: ProviderRequest) => {
                console.log(res);
                this.apiClient.providerAccount = res.user;
                this.account = res.user;
                this.isLoading = false;
                this.snackBar.open('Success', '', {
                  duration: 1000
                })
              }, error: (err: any) => {
                alert('Error updating profile, check console.');
                console.log(err);
              }
            });
          }
      }
    } else {
      alert("Form is invalid");
    }
  }

  onEnable() {
    // enable form
    this.formData.enable();
    // Keep password disabled
    this.formData.controls.passwordControl.disable();
    this.formDisabled = false;
  }

  onCancel() {
    // reset form values and disable form
    this.formDisabled = true;
    // this.formData.reset({nameControl: this.service.name, typeControl: this.service.type, categoryControl: this.service.category, descriptionControl: this.service.description, locationControl: this.service.location, priceControl: this.service.price})
    this.formData.disable();
  }
}
