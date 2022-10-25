import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-sign-up-provider',
  templateUrl: './sign-up-provider.component.html',
  styleUrls: ['./sign-up-provider.component.css']
})
export class SignUpProviderComponent implements OnInit {

  formData = new FormGroup({
    fnameControl: new FormControl(''),
    lnameControl: new FormControl(''),
    emailControl: new FormControl(''),
    phoneControl: new FormControl(''),
    yearControl: new FormControl(''),
    passwordControl: new FormControl(''),
    addressControl: new FormControl(''),
    cityControl: new FormControl(''),
    pincodeControl: new FormControl(''),
  })


  @ViewChild("generateUsernameButton")
  usernameButton!: MatButton;

  username: string = "";
  hidePassword: boolean = true;

  isLoading: boolean = false;

  constructor(private apiClient: ApiClientService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Generates a random username from the backend
   */
   generateUsername() {
    let first = this.formData.controls.fnameControl.value;
    let last = this.formData.controls.lnameControl.value;
    this.username = Math.random() + "";
    // if(first && last && first != "" && last != "") {
    //   this.apiClient.generateRandomUsername(first, last).subscribe({
    //     next: (res: RandomUsername) => {
    //       this.username = res.data;
    //     }, error: (err: any) => {
    //       alert("Error generating username");
    //     }
    //   })
    // } else {
    //   alert("Must first enter: First name, Last name");
    // }
  }

  /**
   * Submitting the form (account creation in backend)
   */
   onSubmit() {
    // First make sure the form is valid
    if(this.formData.valid) {
      // Now make sure all the form controls have values
      if(this.formData.controls.fnameControl.value
        && this.formData.controls.lnameControl.value
        && this.formData.controls.emailControl.value
        && this.formData.controls.phoneControl.value
        && this.formData.controls.passwordControl.value
        && this.formData.controls.yearControl.value
        && this.formData.controls.addressControl.value
        && this.formData.controls.cityControl.value
        && this.formData.controls.pincodeControl.value) {
        // Now make sure the user has generated a username value
        if(this.username != "") {
          // Start loading API
          this.isLoading = true;
          // Disable all form components
          this.formData.disable();
          this.usernameButton.disabled = true;
          // Create new consumer account object
          let newAccount: ProviderAccount = {
            username: this.username,
            fname: this.formData.controls.fnameControl.value,
            lname: this.formData.controls.lnameControl.value,
            email: this.formData.controls.emailControl.value,
            password: this.formData.controls.passwordControl.value,
            phone: this.formData.controls.phoneControl.value,
            schoolyear: this.formData.controls.yearControl.value,
            address: this.formData.controls.addressControl.value,
            pincode: this.formData.controls.pincodeControl.value,
            currlocation: this.formData.controls.cityControl.value
          };
          console.log(JSON.stringify(newAccount));
          // Call API to post account creation
          this.apiClient.registerProvider(newAccount).subscribe({
              next: (res: any) => {
                // Done loading (2 second timeout to show the progress spinner)
                setTimeout(() => {
                   // Set API service username, and set is logged in to true
                   this.apiClient.username = this.username;
                   this.apiClient.authenticated = true;
                   // Display success snackba, then navigate to consumer home page
                   this.snackBar.open("SignUp Successful", "", {
                    duration: 1000,
                    panelClass: ['green-snackbar'],
                   }).afterDismissed().subscribe(() => {
                    // After the success snackbar disappears, then navigate the user to the consumer home page
                    this.router.navigateByUrl("home/main-view");
                    // Now set is loading to false
                    this.isLoading = false;
                   });
                }, 1000);
              }, error: (err: any) => {
                // Done loading
                this.isLoading = false;
                alert("Something went wrong posting the account");
                // Display failure snackbar
                this.snackBar.open("SignUp Failure", "", {
                  duration: 2000,
                  panelClass: ['red-snackbar'],
                })
              }
            })
        } else {
          alert("You must generate a username");
        }
      } else {
        alert("Something went wrong getting the form values");
      }
    } else {
      alert("Form is invalid");
    }
  }

}

