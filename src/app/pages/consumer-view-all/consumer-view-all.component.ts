import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterPopupComponent } from 'src/app/shared/components/filter-popup/filter-popup.component';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ProvidersRequest } from 'src/app/shared/models/providers-request.model';
import { Service } from 'src/app/shared/models/service.model';
import { ServicesRequest } from 'src/app/shared/models/services-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

export interface FilterData {
  temp1: string;
  temp2: string;
}

@Component({
  selector: 'app-consumer-view-all',
  templateUrl: './consumer-view-all.component.html',
  styleUrls: ['./consumer-view-all.component.css']
})
export class ConsumerViewAllComponent implements OnInit {

  
  filterData: FilterData = {temp1: "Test1", temp2: "Test2"};
  sortedServices: Service[] = [];

  constructor(public dialog: MatDialog, private router: Router, private apiClient: ApiClientService) { }

  ngOnInit(): void {
    this.loadServices();
  }


  loadServices() {
    this.sortedServices = this.apiClient.services; 
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
    return this.apiClient.providers.find(p => p._id == userID);
  }

  /**
   * Navigate to the service details page
   * @param selectedService The service data to send to the service details page
   */
  viewService(selectedService: Service) {
    this.router.navigate(['/home/service-details'], {state: selectedService});
  }


  sortChange(e: any) {
    if(e.value == "ratings") {
      this.sortedServices.sort((a, b) => {return b.ratings - a.ratings});
    } else if(e.value == "recent") {
      this.sortedServices.sort((a, b) => {return b.createdAt! < a.createdAt! ? 1 : -1});
    }
  }


  searchChange(e: any) {
    this.apiClient.getServices().subscribe({
      next: (res: ServicesRequest) => {
        // Make sure request returned success
        if(res.success) {
          this.sortedServices = res.services.filter(p => {return p.name.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())});
        } else {
          alert("Request returned unsuccessful when attempting to filter the services.")
        }
      }, error: (err: any) => {
        alert("Error occured getting the services to filter. See console for details.")
        console.log(err);
      }
    })
  }
}
