import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiClientService } from 'src/app/services/api-client.service';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';

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
    yearControl: new FormControl(''),
    usernameControl: new FormControl(''),
    passwordControl: new FormControl(''),
  })

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  interests: string[] = [];

  constructor(private apiClient: ApiClientService) { }

  ngOnInit(): void {
  }



  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim().toLowerCase();
    // Add the input string
    if (value) {
      this.interests.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.interests.indexOf(value);
    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }

  onSubmit() {
    // if(this.formData.valid) {
    //   this.apiClient.createNewAccount(
    //     this.formData.controls.fnameControl.value,
    //     this.formData.controls.lnameControl.value,
    //     this.formData.controls.emailControl.value,)
    // }
    console.log(this.formData);
    console.log(this.interests);
  }

}
