import { Injectable, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RandomUsername } from '../models/random-username.model';
import { ConsumerAccount } from '../models/consumer-account.model';
import { ProviderAccount } from '../models/provider-account.model';
import { Service } from '../models/service.model';
import { ServicesRequest } from '../models/services-request.model';
import { ConsumerRequest } from '../models/consumer-request.model';
import { ProviderRequest } from '../models/provider-request.model';
import { map, Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { SingleServiceRequest } from '../models/single-service-request.model';
import { ProvidersRequest } from '../models/providers-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  //username: string = "";
  //authenticatedConsumer: boolean = false;
  //authenticatedProvider: boolean = false;
  consumerAccount: ConsumerAccount = null!;
  providerAccount: ProviderAccount = null!;
  password: string = "";

  constructor(private httpClient: HttpClient) { }

  registerConsumer(account: ConsumerAccount) {
    // Call the API, and return the observable
    return this.httpClient.post<ConsumerRequest>(environment.apiUrl + "/v1/register", account);
  }

  registerProvider(account: ProviderAccount) {
    // Call the API, and return the observable
    return this.httpClient.post<ProviderRequest>(environment.apiUrl + "/v1/registerprovider", account);
  }

  loginConsumer(email_: string, password_: string) {
    // Generate the body object from the parameters
    let body = {
      email: email_,
      password: password_
    };
    // Call the API, and return the observable
    return this.httpClient.post<ConsumerRequest>(environment.apiUrl + "/v1/login", body);
  }

  loginProvider(email_: string, password_: string) {
    // Generate the body object from the parameters
    let body = {
      email: email_,
      password: password_
    };
    // Call the API, and return the observable
    return this.httpClient.post<ProviderRequest>(environment.apiUrl + "/v1/loginprovider", body);
  }

  /**
   * Checks if the user is authenticated as EITHER a consumer or a provider
   * @returns True if authenticated as either
   */
  authenticated(): Observable<boolean> {
    if(this.consumerAccount) {
      return this.authenticatedConsumer();
    } else if(this.providerAccount) {
      return this.authenticatedProvider();
    } else {
      return of(false);
    }
  }

  /**
   * Checks if the user is authenticated as a consumer
   * @returns True if authenticated as a consumer
   */
  authenticatedConsumer(): Observable<boolean> {
    let body = {
      email: this.consumerAccount.email,
      //password: this.consumerAccount.password
      password: this.password
    }
    return this.httpClient.post<ConsumerRequest>(environment.apiUrl + "/v1/login", body).pipe(map((val) => {return val.success}));
  }

  /**
   * Checks if the user is authenticated as a provider
   * @returns True if authenticated as a provider
   */
  authenticatedProvider(): Observable<boolean> {
    let body = {
      email: this.providerAccount.email,
      //password: this.providerAccount.password
      password: this.password
    }
    return this.httpClient.post<ProviderRequest>(environment.apiUrl + "/v1/loginprovider", body).pipe(map((val) => {return val.success}));
  }

  getServices() {
    // Call the API, and return the observable
    return this.httpClient.get<ServicesRequest>(environment.apiUrl + "/v1/services");
  }

  postServiceAdmin(service: Service) {
    // Call the API, and return the observable
    return this.httpClient.post<SingleServiceRequest>(environment.apiUrl + "/v1/admin/service/new", service);
  }


  // getProviderDetailsAdmin(providerID: string) {
  //   // Call the API, and return the observable
  //   return this.httpClient.get<ProviderRequest>(environment.apiUrl + "/v1/admin/provider/" + providerID);
  // }

  getAllProvidersAdmin() {
    // Call the API, and return the observable
    return this.httpClient.get<ProvidersRequest>(environment.apiUrl + "/v1/admin/provider/");
  }
}
