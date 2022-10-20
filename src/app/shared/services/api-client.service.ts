import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RandomUsername } from '../models/random-username.model';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  username: string = "";
  authenticated: boolean = false;

  constructor(private httpClient: HttpClient) { }


  generateRandomUsername(fname_: string, lname_: string) {
    // Generate the body object from the parameters
    let body = {
      fname: fname_,
      lname: lname_
    };
    // Call the API, and return the observable
    return this.httpClient.post<RandomUsername>(environment.apiUrl + "/v1/auth/generateUsername", body);
  }

  createNewAccount(fname_: string, lname_: string, email_: string, phone_: string, username_: string, password_: string) {
    // Generate the body object from the parameters
    let body = {
      fname: fname_,
      lname: lname_,
      email: email_,
      phone: phone_,
      username: username_,
      password: password_
    };
    // Call the API, and return the observable
    return this.httpClient.post(environment.apiUrl + "/v1/auth/register", body);
  }

  loginUser(email_: string, password_: string) {
    // Generate the body object from the parameters
    let body = {
      email: email_,
      password: password_
    };
    // Call the API, and return the observable
    return this.httpClient.post(environment.apiUrl + "/v1/auth/login", body);
  }
}
