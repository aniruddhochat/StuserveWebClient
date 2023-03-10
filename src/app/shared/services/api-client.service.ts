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
import { UsernameRequest } from '../models/username-request.model';
import { PayementRequest } from '../models/payement-request.model';
import { Order } from '../models/order.model';
import { OrdersRequest } from '../models/orders-request.model';
import { ConsumersRequest } from '../models/consumers-request.model';
import { AdminRequest } from '../models/admin-request.model';
import { Admin } from '../models/admin.model';
import { CategoriesRequest } from '../models/categories-request.model';
import { GoogleAccount } from '../models/google-account.model';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Chat } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  consumerAccount: ConsumerAccount = null!;
  providerAccount: ProviderAccount = null!;
  adminAccount: Admin = null!; // Admin account
  socialUser: GoogleAccount = null!;
  password: string = "";
  providers: ProviderAccount[] = [];
  consumers: ConsumerAccount[] = [];
  approvedServices: Service[] = [];
  categories: Category[] = [];
  // Starts as true because the initial data loading will always be invoked at the startup of the application
  isLoading: boolean = true;
  // This is used to hold if the application has finished atleast one initializeData() call successfully
  hasDoneInitialSetup: boolean = false;

  constructor(private httpClient: HttpClient) { }

  initializeData() {
    this.isLoading = true;
    this.getApprovedServices().subscribe({
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
                      this.getAllConsumerDetails().subscribe({
                        next: (res4) => {
                          // Make sure API returned success
                          if(res4.success) {
                            // Set global variables
                            this.approvedServices = res1.services;
                            this.providers = res2.providers;
                            this.categories = res3.category;
                            this.consumers = res4.users;
                            // Done loading 
                            this.isLoading = false;
                            // Set initialze data to true
                            this.hasDoneInitialSetup = true;
                          }
                        }, error: (err: any) => {
                          alert("Error initializing application data. The error occured when attempting to load all consumers details. Check the console for error details");
                          console.log(err);
                          // Done loading 
                          this.isLoading = false;
                        }
                      });
                    } else {
                      // Done loading 
                      this.isLoading = false;
                    }
                  }, error: (err: any) => {
                    alert("Error initializing application data. The error occured when attempting to load all category objects. Check the console for error details");
                    console.log(err);
                    // Done loading 
                    this.isLoading = false;
                  }
                })
              } else {
                alert("Error initializing application data. The error occured when attempting to load all providers details. The API result returned an unsuccessful");
                // Done loading 
                this.isLoading = false;
              }
            }, error: (err: any) => {
              alert("Error initializing application data. The error occured when attempting to load all providers details. Check the console for error details");
              console.log(err);
              // Done loading 
              this.isLoading = false;
            }
          })
        } else {
          alert("Error initializing application data. The error occured when attempting to load all services. The API result returned an unsuccessful");
          // Done loading 
          this.isLoading = false;
        }
      }, error: (err: any) => {
        alert("Error initializing application data. The error occured when attempting to load all services. Check the console for error details");
        console.log(err);
        // Done loading 
        this.isLoading = false;
      }
    })
  }

  registerConsumer(account: ConsumerAccount) {
    // Call the API, and return the observable
    return this.httpClient.post<ConsumerRequest>(environment.apiUrl + "/v1/register", account, {withCredentials:true});
  }

  updateConsumer(account: ConsumerAccount) {
    // Call the API, and return the observable
    return this.httpClient.put<ConsumerRequest>(environment.apiUrl + "/v1/me/update", account, {withCredentials:true});
  }

  updateProvider(account: ProviderAccount) {
    // Call the API, and return the observable
    return this.httpClient.put<ProviderRequest>(environment.apiUrl + "/v1/me/updateprovider", account, {withCredentials:true});
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


  loginProviderGoogle(_socialUser: SocialUser) {
    // Call the API, and return the observable
    return this.httpClient.post<ProviderRequest>(environment.apiUrl + "/v1/loginproviderGoogle", _socialUser, {withCredentials:true});
  }


  loginConsumerGoogle(_socialUser: SocialUser) {
    // Call the API, and return the observable
    return this.httpClient.post<ConsumerRequest>(environment.apiUrl + "/v1/loginuserGoogle", _socialUser, {withCredentials:true});
  }

  /**
   * Checks if the user is authenticated as EITHER a consumer or a provider
   * @returns True if authenticated as either
   */
  authenticated(): boolean {
    if(this.consumerAccount || this.providerAccount) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks if the user is authenticated as a consumer
   * @returns True if authenticated as a consumer
   */
  // authenticatedConsumer(): Observable<boolean> {
  //   let body = {
  //     email: this.consumerAccount.email,
  //     //password: this.consumerAccount.password
  //     password: this.password
  //   }
  //   return this.httpClient.post<ConsumerRequest>(environment.apiUrl + "/v1/login", body, {withCredentials:true}).pipe(map((val) => {return val.success}));
  // }

  // /**
  //  * Checks if the user is authenticated as a provider
  //  * @returns True if authenticated as a provider
  //  */
  // authenticatedProvider(): Observable<boolean> {
  //   let body = {
  //     email: this.providerAccount.email,
  //     //password: this.providerAccount.password
  //     password: this.password
  //   }
  //   return this.httpClient.post<ProviderRequest>(environment.apiUrl + "/v1/loginprovider", body, {withCredentials:true}).pipe(map((val) => {return val.success}));
  // }

  getAllServices() {
    // Call the API, and return the observable
    return this.httpClient.get<ServicesRequest>(environment.apiUrl + "/v1/services", {withCredentials:true});
  }

  getApprovedServices() {
    // Call the API, and return the observable
    return this.httpClient.get<ServicesRequest>(environment.apiUrl + "/v1/getApprovedServices", {withCredentials:true});
  }

  getPendingServices() {
    // Call the API, and return the observable
    return this.httpClient.get<ServicesRequest>(environment.apiUrl + "/v1/adminGetAllServicesApproval", {withCredentials:true});
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

  getAllConsumerDetails() {
    // Call the API, and return the observable
    return this.httpClient.get<ConsumersRequest>(environment.apiUrl + "/v1/userdetails", {withCredentials:true});
  }


  addCategory(_category: Category) {
    // Call the API, and return the observable
    return this.httpClient.post<CategoryRequest>(environment.apiUrl + "/v1/admin/category/new", _category, {withCredentials:true});
  }

  getCategories() {
    // Call the API, and return the observable
    return this.httpClient.get<CategoriesRequest>(environment.apiUrl + "/v1/getcategory", {withCredentials:true});
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

  postStripePayement(_amount: number, _stripeToken: string) {
    let body = {
      amount: _amount,
      stripeToken: _stripeToken
    }
    return this.httpClient.post<any>(environment.apiUrl + "/v1/payment/process", body, {withCredentials:true});
  }


  postNewOrder(_order: Order) {
    return this.httpClient.post<any>(environment.apiUrl + "/v1/order/new", _order, {withCredentials:true});
  }


  getConsumerOrders() {
    return this.httpClient.post<OrdersRequest>(environment.apiUrl + "/v1/orders/me", this.consumerAccount, {withCredentials:true});
  }


  getProviderOrders() {
    return this.httpClient.post<OrdersRequest>(environment.apiUrl + "/v1/orders/provider", this.providerAccount, {withCredentials:true});
  }

  getAllOrders() {
    return this.httpClient.get<OrdersRequest>(environment.apiUrl + "/v1/provider/orders", {withCredentials:true});
  }

  approveOrder(_orderId: string, _chargeId: string) {
    let body = {
      status: "Completed",
      chargeId: _chargeId
    }
    return this.httpClient.put<any>(environment.apiUrl + "/v1/provider/order/" + _orderId, body, {withCredentials:true});
  }


  loginAdmin(_username: string, _password: string) {
    // Generate the body object from the parameters
    let body = {
      email: _username,
      password: _password
    };
    // Call the API, and return the observable
    return this.httpClient.post<AdminRequest>(environment.apiUrl + "/v1/loginAdmin", body, {withCredentials:true});
  }


  getPendingProviders() {
    // Call the API, and return the observable
    return this.httpClient.get<ProvidersRequest>(environment.apiUrl + "/v1/getAllAdminProviders", {withCredentials:true});
  }


  getPendingProvidersGoogle() {
    // Call the API, and return the observable
    return this.httpClient.get<ProvidersRequest>(environment.apiUrl + "/v1/getAllAdminProvidersGoogle", {withCredentials:true});
  }


  approveProvider(_provider: ProviderAccount) {
    // Call the API, and return the observable
    return this.httpClient.post<any>(environment.apiUrl + "/v1/approveProvider/" + _provider._id, {withCredentials:true});
  }


  approveService(_service: Service) {
    // Call the API, and return the observable
    return this.httpClient.post<any>(environment.apiUrl + "/v1/approveService/" + _service._id, {withCredentials:true});
  }


  deleteService(_service: Service) {
    return this.httpClient.delete<any>(environment.apiUrl + "/v1/adminDeleteService/" + _service._id, {withCredentials:true});
  }

  deleteProvider(_provider: ProviderAccount) {
    return this.httpClient.delete<any>(environment.apiUrl + "/v1/adminDeleteProvider/" + _provider._id, {withCredentials:true});
  }

  deleteConsumer(_consumer: ConsumerAccount) {
    return this.httpClient.delete<any>(environment.apiUrl + "/v1/adminDeleteConsumer/" + _consumer._id, {withCredentials:true});
  }

  deleteCategory(_category: Category) {
    return this.httpClient.delete<any>(environment.apiUrl + "/v1/admin/deleteCategory/" + _category._id, {withCredentials:true});
  }

  deleteOrder(_order: Order) {
    return this.httpClient.delete<any>(environment.apiUrl + "/v1/adminDeleteOrder/" + _order._id, {withCredentials:true});
  }

  createChatConsumer(_chat: Chat) {
    return this.httpClient.post<any>(environment.apiUrl + "/v1/chatUser/new", _chat, {withCredentials:true});
  }

  createChatProvider(_chat: Chat) {
    return this.httpClient.post<any>(environment.apiUrl + "/v1/chatprovider/new", _chat, {withCredentials:true});
  }
}
