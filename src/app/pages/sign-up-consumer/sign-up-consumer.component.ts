import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-sign-up-consumer',
  templateUrl: './sign-up-consumer.component.html',
  styleUrls: ['./sign-up-consumer.component.css']
})
export class SignUpConsumerComponent implements OnInit {
  formData = new FormGroup({
    fnameControl: new FormControl(''),
    lnameControl: new FormControl(''),
    emailControl: new FormControl(''),
    phoneControl: new FormControl(''),
    usernameControl: new FormControl(''),
    passwordControl: new FormControl(''),
  })
  

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
