import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { Router } from '@angular/router';
import { ConsumerAccount } from 'src/app/shared/models/consumer-account.model';
import { ConsumerRequest } from 'src/app/shared/models/consumer-request.model';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipGrid, MatChipInputEvent } from '@angular/material/chips';
import { GeocodeService } from 'src/app/shared/services/geocode.service';
import { UsernameRequest } from 'src/app/shared/models/username-request.model';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';



@Component({
  selector: 'app-sign-up-consumer',
  templateUrl: './sign-up-consumer.component.html',
  styleUrls: ['./sign-up-consumer.component.css']
})
export class SignUpConsumerComponent implements OnInit {
  @ViewChild("chipList")
  interestList!: MatChipGrid;

  @ViewChild("placesInput")
  placesInput!: ElementRef;

  @ViewChild("generateUsernameButton")
  usernameButton!: MatButton;
  username: string = "";
  hidePassword: boolean = true;

  avatar?: File;

  isLoading: boolean = false;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  interests: string[] = [];

  constructor(public apiClient: ApiClientService, private snackBar: MatSnackBar, private router: Router, private geoService: GeocodeService, private cloudService: CloudinaryService) { }

  formData = new FormGroup({
    fnameControl: new FormControl(''),
    lnameControl: new FormControl(''),
    emailControl: new FormControl(''),
    phoneControl: new FormControl(''),
    yearControl: new FormControl(''),
    passwordControl: new FormControl(''),
    addressControl: new FormControl(''),
  })

  myWidget: any;

  ngOnInit(): void {
    if(this.apiClient.socialUser) {
      this.formData = new FormGroup({
        fnameControl: new FormControl(this.apiClient.socialUser.firstName),
        lnameControl: new FormControl(this.apiClient.socialUser.lastName),
        emailControl: new FormControl(this.apiClient.socialUser.email),
        phoneControl: new FormControl(''),
        yearControl: new FormControl(''),
        passwordControl: new FormControl(''),
        addressControl: new FormControl(''),
      });
      // Disable certain fields
      this.formData.controls.fnameControl.disable();
      this.formData.controls.lnameControl.disable();
      this.formData.controls.emailControl.disable();
      this.formData.controls.passwordControl.disable();
    };
  }

  handleUpload(e: any):void{
    this.avatar = e.target.files[0];    
  }

  autocomplete() {
    this.geoService.setAutocomplete(this.placesInput.nativeElement);
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
    //this.username = Math.random() + "";
    if(first && last && first != "" && last != "") {
      this.apiClient.generateUsername(first, last).subscribe({
        next: (res: UsernameRequest) => {
          this.username = res.data;
        }, error: (err: any) => {
          alert("Error generating username");
        }
      });
    } else {
      alert("Must first enter: First name, Last name");
    }
  }

  /**
   * Submitting the form (account creation in backend)
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
        // Now make sure the user has generated a username value
        if(this.username != "") {
          // Start loading API
          this.isLoading = true;
          // Disable all form components
          this.formData.disable();
          this.interestList.disabled = true;
          this.usernameButton.disabled = true;

          // Check if file is selected to upload to cloudinary
          if(this.apiClient.socialUser) {
            this.cloudService.postImageUrl(this.apiClient.socialUser.photoUrl, this.username, 'stuserve/avatars').subscribe({
              next: (res: any) => {
                console.log(res);
                // Create new consumer account object
                let newAccount: ConsumerAccount = {
                  avatar: {
                    public_id: res.public_id,
                    url: res.secure_url
                  },
                  interests: this.interests,
                  username: this.username,
                  fname: this.formData.controls.fnameControl.value!,
                  lname: this.formData.controls.lnameControl.value!,
                  email: this.formData.controls.emailControl.value!,
                  phone: this.formData.controls.phoneControl.value!,
                  schoolyear: this.formData.controls.yearControl.value!,
                  address: this.placesInput.nativeElement.value,
                  role: 'consumer'
                };
                if(this.formData.controls.passwordControl.value && this.formData.controls.passwordControl.value != '') {
                  newAccount.password = this.formData.controls.passwordControl.value;
                }
                console.log(newAccount);
                // Call API to post account creation
                this.apiClient.registerConsumer(newAccount).subscribe({
                    next: (res: ConsumerRequest) => {
                      // Done loading (2 second timeout to show the progress spinner)
                      setTimeout(() => {
                        // Make sure the request sent back a success
                        if(res.success) {
                          // Set the user account variable in the api client
                          this.apiClient.consumerAccount = res.user;
                          this.apiClient.password = this.formData.controls.passwordControl.value!;
                          // Display success snackba, then navigate to consumer home page
                          this.snackBar.open("SignUp Successful", "", {
                            duration: 1000,
                            panelClass: ['green-snackbar'],
                          }).afterDismissed().subscribe(() => {
                            // After the success snackbar disappears, then navigate the user to the consumer home page
                            this.router.navigateByUrl("home/consumer-home");
                            // Now set is loading to false
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
                      }, 1000);
                    }, error: (err: any) => {
                      // Done loading
                      this.isLoading = false;
                      // Alert user of error
                      console.log(err);
                      alert("Something went wrong posting the account, check console for details.");
                      // Display failure snackbar
                      this.snackBar.open("SignUp Failure", "", {
                        duration: 2000,
                        panelClass: ['red-snackbar'],
                      })
                    }
                  })
              }, error: (err: any) => {
                alert('Failed creating account, could not upload image to cloudinary. Check console for details.');
                console.log(err);
              }
            });
          } else if(this.avatar) {
            this.cloudService.postImageFile(this.avatar, this.username, 'stuserve/avatars').subscribe({
              next: (res: any) => {
                console.log(res);
                // Create new consumer account object
                let newAccount: ConsumerAccount = {
                  avatar: {
                    public_id: res.public_id,
                    url: res.secure_url
                  },
                  interests: this.interests,
                  username: this.username,
                  fname: this.formData.controls.fnameControl.value!,
                  lname: this.formData.controls.lnameControl.value!,
                  email: this.formData.controls.emailControl.value!,
                  password: this.formData.controls.passwordControl.value ? this.formData.controls.passwordControl.value : null!,
                  phone: this.formData.controls.phoneControl.value!,
                  schoolyear: this.formData.controls.yearControl.value!,
                  address: this.placesInput.nativeElement.value,
                  role: 'consumer'
                };
                console.log(JSON.stringify(newAccount));
                // Call API to post account creation
                this.apiClient.registerConsumer(newAccount).subscribe({
                    next: (res: ConsumerRequest) => {
                      // Done loading (2 second timeout to show the progress spinner)
                      setTimeout(() => {
                        // Make sure the request sent back a success
                        if(res.success) {
                          // Set the user account variable in the api client
                          this.apiClient.consumerAccount = res.user;
                          //this.apiClient.password = this.formData.controls.passwordControl.value!;
                          // Display success snackba, then navigate to consumer home page
                          this.snackBar.open("SignUp Successful", "", {
                            duration: 1000,
                            panelClass: ['green-snackbar'],
                          }).afterDismissed().subscribe(() => {
                            // After the success snackbar disappears, then navigate the user to the consumer home page
                            this.router.navigateByUrl("home/consumer-home");
                            // Now set is loading to false
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
                      }, 1000);
                    }, error: (err: any) => {
                      // Done loading
                      this.isLoading = false;
                      // Alert user of error
                      console.log(err);
                      alert("Something went wrong posting the account, check console for details.");
                      // Display failure snackbar
                      this.snackBar.open("SignUp Failure", "", {
                        duration: 2000,
                        panelClass: ['red-snackbar'],
                      })
                    }
                  })
              }, error: (err: any) => {
                alert('Failed creating account, could not upload image to cloudinary. Check console for details.');
                console.log(err);
              }
            });
          } else {
            // Create new consumer account object
            let newAccount: ConsumerAccount = {
              avatar: {
                public_id: 'myCloud.public_id',
                url: 'nan'
              },
              interests: this.interests,
              username: this.username,
              fname: this.formData.controls.fnameControl.value,
              lname: this.formData.controls.lnameControl.value,
              email: this.formData.controls.emailControl.value,
              password: this.formData.controls.passwordControl.value ? this.formData.controls.passwordControl.value : null!,
              phone: this.formData.controls.phoneControl.value,
              schoolyear: this.formData.controls.yearControl.value,
              address: this.placesInput.nativeElement.value,
              role: 'consumer'
            };
            console.log(JSON.stringify(newAccount));
            // Call API to post account creation
            this.apiClient.registerConsumer(newAccount).subscribe({
                next: (res: ConsumerRequest) => {
                  // Done loading (2 second timeout to show the progress spinner)
                  setTimeout(() => {
                    // Make sure the request sent back a success
                    if(res.success) {
                      // Set the user account variable in the api client
                      this.apiClient.consumerAccount = res.user;
                      this.apiClient.password = this.formData.controls.passwordControl.value!;
                      // Display success snackba, then navigate to consumer home page
                      this.snackBar.open("SignUp Successful", "", {
                        duration: 1000,
                        panelClass: ['green-snackbar'],
                      }).afterDismissed().subscribe(() => {
                        // After the success snackbar disappears, then navigate the user to the consumer home page
                        this.router.navigateByUrl("home/consumer-home");
                        // Now set is loading to false
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
                  }, 1000);
                }, error: (err: any) => {
                  // Done loading
                  this.isLoading = false;
                  // Alert user of error
                  console.log(err);
                  alert("Something went wrong posting the account, check console for details.");
                  // Display failure snackbar
                  this.snackBar.open("SignUp Failure", "", {
                    duration: 2000,
                    panelClass: ['red-snackbar'],
                  })
                }
              })
          }
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
