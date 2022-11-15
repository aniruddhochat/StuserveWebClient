import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConsumerRequest } from 'src/app/shared/models/consumer-request.model';
import { ProviderRequest } from 'src/app/shared/models/provider-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoading: boolean = false;

  hidePassword: boolean = true;

  accountType: string = "consumer";

  formData = new FormGroup({
    usernameControl: new FormControl(''),
    passwordControl: new FormControl('')
  });

  socialUser!: SocialUser;
  isLoggedin?: boolean;

  constructor(private apiClient: ApiClientService, private snackBar: MatSnackBar, private router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }


  radioGroupValueChanged(e: any) {
    this.accountType = e.value;
  }


  onSubmit() {
    // Make sure form is valid first
    if(this.formData.valid) {
      // check which login type to attempt
      // CONSUMER SIGN IN
      if(this.accountType == 'consumer') {
        // Start loading
        this.isLoading = true;
        // Now attempt to log the user in
        this.apiClient.loginConsumer(this.formData.controls.usernameControl.value!, this.formData.controls.passwordControl.value!).subscribe({
          next: (res: ConsumerRequest) => {
            // Make sure the request sends back a success
            if(res.success) {
              // Set the user account in the api client service
              this.apiClient.consumerAccount = res.user;
              this.apiClient.password = this.formData.controls.passwordControl.value!;
              // Display failure snackbar
              this.snackBar.open("Login Success", "", {
                duration: 1000,
                panelClass: ['green-snackbar'],
              }).afterDismissed().subscribe(() => {
                // Now after the snack bar is dismissed, navigate the user to the consumer home page
                this.router.navigateByUrl("home/consumer-home");
                // Done loading
                this.isLoading = false;
              });
            } else {
              // Request did not send back a success, so alert user
              console.log("API request success variable returned false");
              // Done loading
              this.isLoading = false;
              // Display failure snackbar
              this.snackBar.open("Failure Logging In", "", {
                duration: 2000,
                panelClass: ['red-snackbar'],
              });
            }
          }, error: (err: any) => {
            // Failed login
            console.log(err);
            // Done loading
            this.isLoading = false;
            // Display failure snackbar
            this.snackBar.open("Failure Logging In", "", {
              duration: 2000,
              panelClass: ['red-snackbar'],
            });
          }
        })
      } 
      // PROVIDER SIGN IN
      else if(this.accountType == 'provider') {
        // Start loading
        this.isLoading = true;
        // Now attempt to log the user in
        this.apiClient.loginProvider(this.formData.controls.usernameControl.value!, this.formData.controls.passwordControl.value!).subscribe({
          next: (res: ProviderRequest) => {
            // Make sure the request sends back a success
            if(res.success) {
              // Set the user account in the api client service
              this.apiClient.providerAccount = res.provider;
              this.apiClient.password = this.formData.controls.passwordControl.value!;
              // Display failure snackbar
              this.snackBar.open("Login Success", "", {
                duration: 1000,
                panelClass: ['green-snackbar'],
              }).afterDismissed().subscribe(() => {
                // Now after the snack bar is dismissed, navigate the user to the consumer home page
                this.router.navigateByUrl("home/provider-home");
                // Done loading
                this.isLoading = false;
              });
            } else {
              // Request did not send back a success, so alert user
              console.log("API request success variable returned false");
              // Done loading
              this.isLoading = false;
              // Display failure snackbar
              this.snackBar.open("Failure Logging In", "", {
                duration: 2000,
                panelClass: ['red-snackbar'],
              });
            }
          }, error: (err: any) => {
            // Failed login
            console.log(err);
            // Done loading
            this.isLoading = false;
            // Display failure snackbar
            this.snackBar.open("Failure Logging In", "", {
              duration: 2000,
              panelClass: ['red-snackbar'],
            });
          }
        })
      } 
      // ERROR: NEITHER PROVIDER NOR CONSUMER SIGN IN TYPE DETECTED
      else {
        alert("Error reading what type of account sign in to perform");
      }
    }
  }


  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
