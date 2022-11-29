import { Injectable, Provider } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
import { CategoryRequest } from '../models/category-request.model';
import { Category } from '../models/category.model';
import { ResolveEnd } from '@angular/router';
import { SocialUser } from '../models/social-user.model';
import { UsernameRequest } from '../models/username-request.model';
import { PayementRequest } from '../models/payement-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  consumerAccount: ConsumerAccount = null!;
  providerAccount: ProviderAccount = null!;
  socialUser: SocialUser = null!;
  password: string = "";
  providers: ProviderAccount[] = [];
  services: Service[] = [];
  categories: Category[] = [];
  // Starts as true because the initial data loading will always be invoked at the startup of the application
  isLoading: boolean = true;
  // This is used to hold if the application has finished atleast one initializeData() call successfully
  hasDoneInitialSetup: boolean = false;

  constructor(private httpClient: HttpClient) { }

  initializeData() {
    this.isLoading = true;
    this.getServices().subscribe({
      next: (res1) => {
        // Make sure API returned success
        if(res1.success) {
          this.getAllProviderDetails().subscribe({
            next: (res2) => {
              // Make sure API returned success
              if(res2.success) {
                this.getCategories().subscribe({
                  next: (res3) => {
                    // Make sure API returned success
                    if(res3.success) {
                      // Set global variables
                      this.services = res1.services;
                      this.providers = res2.providers;
                      this.categories = res3.category;
                      // Done loading 
                      this.isLoading = false;
                      // Set initialze data to true
                      this.hasDoneInitialSetup = true;
                    } else {
                      // Done loading 
                      this.isLoading = false;
                    }
                  }, error: (err) => {
                    alert("Error initializing application data. The error occured when attempting to load all category objects. Check the console for error details");
                    // Done loading 
                    this.isLoading = false;
                  }
                })
              } else {
                alert("Error initializing application data. The error occured when attempting to load all providers details. The API result returned an unsuccessful");
                // Done loading 
                this.isLoading = false;
              }
            }, error: (err) => {
              alert("Error initializing application data. The error occured when attempting to load all providers details. Check the console for error details");
              // Done loading 
              this.isLoading = false;
            }
          })
        } else {
          alert("Error initializing application data. The error occured when attempting to load all services. The API result returned an unsuccessful");
          // Done loading 
          this.isLoading = false;
        }
      }, error: (err) => {
        alert("Error initializing application data. The error occured when attempting to load all services. Check the console for error details");
        // Done loading 
        this.isLoading = false;
      }
    })
  }

  registerConsumer(account: ConsumerAccount) {
    // Call the API, and return the observable
    return this.httpClient.post<ConsumerRequest>(environment.apiUrl + "/v1/register", account, {withCredentials:true});
  }

  registerProvider(account: ProviderAccount) {
    // Call the API, and return the observable
    return this.httpClient.post<ProviderRequest>(environment.apiUrl + "/v1/registerprovider", account, {withCredentials:true});
  }

  loginConsumer(email_: string, password_: string) {
    // Generate the body object from the parameters
    let body = {
      email: email_,
      password: password_
    };
    // Call the API, and return the observable
    return this.httpClient.post<ConsumerRequest>(environment.apiUrl + "/v1/login", body, {withCredentials:true});
  }

  loginProvider(email_: string, password_: string) {
    // Generate the body object from the parameters
    let body = {
      email: email_,
      password: password_
    };
    // Call the API, and return the observable
    return this.httpClient.post<ProviderRequest>(environment.apiUrl + "/v1/loginprovider", body, {withCredentials:true});
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
    return this.httpClient.post<ConsumerRequest>(environment.apiUrl + "/v1/login", body, {withCredentials:true}).pipe(map((val) => {return val.success}));
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
    return this.httpClient.post<ProviderRequest>(environment.apiUrl + "/v1/loginprovider", body, {withCredentials:true}).pipe(map((val) => {return val.success}));
  }

  getServices() {
    // Call the API, and return the observable
    return this.httpClient.get<ServicesRequest>(environment.apiUrl + "/v1/services", {withCredentials:true});
  }

  postServiceAdmin(service: Service) {
    // Call the API, and return the observable
    return this.httpClient.post<SingleServiceRequest>(environment.apiUrl + "/v1/admin/service/new", service, {withCredentials:true});
  }


  updateService(service: Service) {
    let serviceID = service._id;
    // Make sure the service id exists on the service object
    if(!serviceID || serviceID.length == 0) {
      alert("Invalid service ID");
    }
    // Call the API, and return the observable
    return this.httpClient.put<SingleServiceRequest>(environment.apiUrl + "/v1/admin/service/" + serviceID, service, {withCredentials:true});
  }


  generateUsername(_fname: string, _lname: string) {
    let body = {
      fname: _fname,
      lname: _lname
    }
    return this.httpClient.post<UsernameRequest>(environment.apiUrl + "/v1/generateUsername", body, {withCredentials:true});
  }


  getProviderDetails(providerID: string) {
    // Call the API, and return the observable
    return this.httpClient.get<ProviderRequest>(environment.apiUrl + "/v1/providerdetails/" + providerID, {withCredentials:true});
  }

  getAllProviderDetails() {
    // Call the API, and return the observable
    return this.httpClient.get<ProvidersRequest>(environment.apiUrl + "/v1/providerdetails", {withCredentials:true});
  }

  getCategories() {
    // Call the API, and return the observable
    return this.httpClient.get<CategoryRequest>(environment.apiUrl + "/v1/getcategory", {withCredentials:true});
  }


  putReview(_serviceId: string, _rating: number, _comment: string) {
    let body = {
      serviceId: _serviceId,
      rating: _rating.toFixed(),
      comment: _comment,
      user: this.consumerAccount._id,
      name: this.consumerAccount.email
    }
    // Call the API, and return the observable
    return this.httpClient.put<{success: boolean}>(environment.apiUrl + "/v1/review", body, {withCredentials:true});
  }

  postStripePayement(_amount: number) {
    let body = {
      amount: _amount
    }
    return this.httpClient.post<PayementRequest>(environment.apiUrl + "/v1/payment/process", body, {withCredentials:true});
  }
}
