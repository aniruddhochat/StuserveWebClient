import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  formData = new FormGroup({
    usernameControl: new FormControl(''),
    passwordControl: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }


  onSubmit() {
    
  }

}
