import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import { RandomUsername } from 'src/app/shared/models/random-username.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-consumer',
  templateUrl: './sign-up-consumer.component.html',
  styleUrls: ['./sign-up-consumer.component.css']
})
export class SignUpConsumerComponent implements OnInit {
  @ViewChild("chipList")
  interestList!: MatChipList;

  @ViewChild("generateUsernameButton")
  usernameButton!: MatButton;

  formData = new FormGroup({
    fnameControl: new FormControl(''),
    lnameControl: new FormControl(''),
    emailControl: new FormControl(''),
    phoneControl: new FormControl(''),
    yearControl: new FormControl(''),
    passwordControl: new FormControl(''),
  })

  username: string = "";
  hidePassword: boolean = true;

  isLoading: boolean = false;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  interests: string[] = [];

  constructor(private apiClient: ApiClientService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }


  /**
   * Add function for the chip list
   */
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim().toLowerCase();
    // Add the input string
    if (value) {
      this.interests.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  /**
   * Remove function for the chip list
   */
  remove(value: string): void {
    const index = this.interests.indexOf(value);
    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }

  /**
   * Generates a random username from the backend
   */
  generateUsername() {
    let first = this.formData.controls.fnameControl.value;
    let last = this.formData.controls.lnameControl.value;
    if(first && last && first != "" && last != "") {
      this.apiClient.generateRandomUsername(first, last).subscribe({
        next: (res: RandomUsername) => {
          this.username = res.data;
        }, error: (err: any) => {
          alert("Error generating username");
        }
      })
    } else {
      alert("Must first enter: First name, Last name");
    }
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
        && this.formData.controls.passwordControl.value) {
        // Now make sure the user has generated a username value
        if(this.username != "") {
          // Start loading API
          this.isLoading = true;
          // Disable all form components
          this.formData.disable();
          this.interestList.disabled = true;
          this.usernameButton.disabled = true;
          // Call API to post account creation
          this.apiClient.createNewAccount(
            this.formData.controls.fnameControl.value,
            this.formData.controls.lnameControl.value,
            this.formData.controls.emailControl.value,
            this.formData.controls.phoneControl.value,
            this.username,
            this.formData.controls.passwordControl.value).subscribe({
              next: (res: any) => {
                // Done loading (2 second timeout to show the progress spinner)
                setTimeout(() => {
                   // Set API service username, and set is logged in to true
                   this.apiClient.username = this.username;
                   this.apiClient.loggedIn = true;
                   // Display success snackba, then navigate to consumer home page
                   this.snackBar.open("SignUp Successful", "", {
                    duration: 1000,
                    panelClass: ['green-snackbar'],
                   }).afterDismissed().subscribe(() => {
                    // After the success snackbar disappears, then navigate the user to the consumer home page
                    this.router.navigateByUrl("home");
                    // Now set is loading to false
                    this.isLoading = false;
                   });
                }, 1000);
              }, error: (err) => {
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
