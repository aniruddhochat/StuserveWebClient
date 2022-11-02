import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FilterPopupComponent } from 'src/app/shared/components/filter-popup/filter-popup.component';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ProviderRequest } from 'src/app/shared/models/provider-request.model';
import { ProvidersRequest } from 'src/app/shared/models/providers-request.model';
import { Service } from 'src/app/shared/models/service.model';
import { ServicesRequest } from 'src/app/shared/models/services-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { FilterData } from '../consumer-view-all/consumer-view-all.component';

@Component({
  selector: 'app-unauthenticated-view-services',
  templateUrl: './unauthenticated-view-services.component.html',
  styleUrls: ['./unauthenticated-view-services.component.css']
})
export class UnauthenticatedViewServicesComponent implements OnInit {

  filterData: FilterData = {temp1: "Test1", temp2: "Test2"};
  services: Service[] = [];
  providers: ProviderAccount[] = [];

  constructor(public dialog: MatDialog, private router: Router, private apiClient: ApiClientService) { }

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    // reset arrays
    this.services = [];
    this.providers = [];
    // Call API to get all services in the DB
    this.apiClient.getServices().subscribe({
      next: (res: ServicesRequest) => {
        // Check successful variable
        if(res.success) {
          // Succesfully got the services, now set the services variable
          this.services = res.services.sort((a, b) => {return b.createdAt! < a.createdAt! ? 1 : -1});;
          // Now call API to get all providers
          this.apiClient.getAllProvidersAdmin().subscribe({
            next: (res2: ProvidersRequest) => {
              // Check successful variable
              if(res2.success) {
                // Success, so set the providers array to the result 
                this.providers = res2.providers;
              } else {
                alert("Providers request variable shows non-successful");
                //this.providers = res2.providers;
              }
            }, error: (err: any) => {
              alert("Error getting providers. See the console for more details");
              console.log(err);
            }
          });
        } else {
          alert("Services request variable shows non-successful");
          //this.services = res.services;
        }
      }, error: (err: any) => {
        // Error retrieving services
        alert("Error getting services. See the console for more details");
        console.log(err);
      }
    });
  }

  /**
   * Method for opening the Filtering popup and grabbing the selected options from the FilterPopupComponent
   */
  openFiltering(): void {
    // Open dialog and send options
    const dialogRef = this.dialog.open(FilterPopupComponent, {
      width: '250px',
      data: this.filterData,
    });
    // Close dialog and grab selections
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Make sure the popup returns data (it won't if the hit 'no thanks', and we do not want 
      //   to set the filter data to undefined. We want it to be the old filter data)
      if(result) {
        this.filterData = result;
      }
    });
  }

  getUser(userID: string) {
    return this.providers.find(p => p._id == userID);
  }


  sortChange(e: any) {
    if(e.value == "ratings") {
      this.services.sort((a, b) => {return b.ratings - a.ratings});
    } else if(e.value == "recent") {
      this.services.sort((a, b) => {return b.createdAt! < a.createdAt! ? 1 : -1});
    }
  }
}
