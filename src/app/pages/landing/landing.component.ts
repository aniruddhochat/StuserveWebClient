import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpTypeSelectComponent } from 'src/app/shared/components/sign-up-type-select/sign-up-type-select.component';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ProvidersRequest } from 'src/app/shared/models/providers-request.model';
import { Service } from 'src/app/shared/models/service.model';
import { ServicesRequest } from 'src/app/shared/models/services-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  topSixServices: Service[] = [];
  providers: ProviderAccount[] = [];

  isLoading: boolean = false;

  constructor(public dialog: MatDialog, private apiClient: ApiClientService) { }

  ngOnInit(): void {
    this.loadTopServices();
  }

  loadTopServices() {
    // Start loading
    this.isLoading = true;
    // Call API to get all services
    this.apiClient.getServices().subscribe({
      next: (res: ServicesRequest) => {
        // Make sure the request returned successful
        if(res.success) {
          this.topSixServices = res.services.sort((a, b) => {return b.ratings - a.ratings}).slice(0, 6);
          // Now call API to get all providers
          this.apiClient.getAllProvidersAdmin().subscribe({
            next: (res2: ProvidersRequest) => {
              // Check successful variable
              if(res2.success) {
                // Success, so set the providers array to the result 
                this.providers = res2.providers;
                // Done loading
                this.isLoading = false;
              } else {
                alert("Providers request variable shows non-successful");
                // Done loading
                this.isLoading = false;
                //this.providers = res2.providers;
              }
            }, error: (err: any) => {
              alert("Error getting providers. See the console for more details");
              console.log(err);
              // Done loading
              this.isLoading = false;
            }
          });
        } else {
          // Request did not return succesful
          alert("Services request did not return succesful");
          // Done loading
          this.isLoading = false;
        }
      }, error: (err: any) => {
        // API request resulted in error
        alert("Error retrieving services. Check console for details");
        console.log(err);
        // Done loading
        this.isLoading = false;
      }
    })
  }

  signUpClick() {
    let dialogRef = this.dialog.open(SignUpTypeSelectComponent, {
      height: 'fit-content',
      width: '750px',
    });
  }

  getUser(userID: string) {
    return this.providers.find(p => p._id == userID);
  }
}
