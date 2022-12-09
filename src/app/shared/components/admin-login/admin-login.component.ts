import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminRequest } from '../../models/admin-request.model';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  isLoading: boolean = false;

  hidePassword: boolean = true;

  formData = new FormGroup({
    usernameControl: new FormControl(''),
    passwordControl: new FormControl(''),
  });

  constructor(private apiClient: ApiClientService, private router: Router, public dialogRef: MatDialogRef<AdminLoginComponent>) {}

  onSubmit() {
    if(!this.formData.invalid
      && this.formData.controls.usernameControl.value
      && this.formData.controls.passwordControl.value) {

      const username = this.formData.controls.usernameControl.value;
      const password = this.formData.controls.passwordControl.value;
      this.apiClient.loginAdmin(username, password).subscribe({
        next: (res: AdminRequest) => {
          this.apiClient.adminAccount = res.user;
          this.dialogRef.close();
          this.router.navigateByUrl('home/admin-home');
        }, error: (err: any) => {
          alert('Error logging in provider, see console for details');
          console.log(err);
        }
      })
    } else {
      alert("Form is invalid");
    }
  }
}
