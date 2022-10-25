import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RandomUsername } from '../models/random-username.model';
import { ConsumerAccount } from '../models/consumer-account.model';
import { ProviderAccount } from '../models/provider-account.model';
import { Service } from '../models/service.model';
import { ServicesRequest } from '../models/services-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  username: string = "";
  authenticated: boolean = false;
  isProvider: boolean = false;

  constructor(private httpClient: HttpClient) { }

  registerConsumer(account: ConsumerAccount) {
    // Call the API, and return the observable
    return this.httpClient.post(environment.apiUrl + "/v1/register", account);
  }

  registerProvider(account: ProviderAccount) {
    // Call the API, and return the observable
    return this.httpClient.post(environment.apiUrl + "/v1/registerprovider", account);
  }

  loginConsumer(email_: string, password_: string) {
    // Generate the body object from the parameters
    let body = {
      email: email_,
      password: password_
    };
    // Call the API, and return the observable
    return this.httpClient.post(environment.apiUrl + "/v1/login", body);
  }

  loginProvider(email_: string, password_: string) {
    // Generate the body object from the parameters
    let body = {
      email: email_,
      password: password_
    };
    // Call the API, and return the observable
    return this.httpClient.post(environment.apiUrl + "/v1/loginprovider", body);
  }

  getServices() {
    // Call the API, and return the observable
    return this.httpClient.get<ServicesRequest>(environment.apiUrl + "/v1/services");
  }
}
