import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoading: boolean = false;

  hidePassword: boolean = true;

  formData = new FormGroup({
    usernameControl: new FormControl(''),
    passwordControl: new FormControl('')
  })

  constructor(private apiClient: ApiClientService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit() {
    // Make sure form is valid first
    if(this.formData.valid) {
      // Start loading
      this.isLoading = true;
      // Now attempt to log the user in
      this.apiClient.loginUser(this.formData.controls.usernameControl.value!, this.formData.controls.passwordControl.value!).subscribe({
        next: (res: any) => {
          // Succesful login
          console.log(res);
          // Set the username in the API service, and set is logged in to true
          this.apiClient.username = this.formData.controls.usernameControl.value!;
          this.apiClient.loggedIn = true;
          // Display failure snackbar
          this.snackBar.open("Login Success", "", {
            duration: 1000,
            panelClass: ['green-snackbar'],
          }).afterDismissed().subscribe(() => {
            // Now after the snack bar is dismissed, navigate the user to the consumer home page
            this.router.navigateByUrl("home-consumer");
            // Done loading
            this.isLoading = false;
          });
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
  }

}
