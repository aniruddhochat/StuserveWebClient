import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiClientService } from 'src/app/services/api-client.service';

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
    usernameControl: new FormControl(''),
    passwordControl: new FormControl(''),
  })

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  interests: string[] = [];

  constructor(private apiClient: ApiClientService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // if(this.formData.valid) {
    //   this.apiClient.createNewAccount(
    //     this.formData.controls.fnameControl.value,
    //     this.formData.controls.lnameControl.value,
    //     this.formData.controls.emailControl.value,)
    // }
    console.log(this.formData);
  }

}

