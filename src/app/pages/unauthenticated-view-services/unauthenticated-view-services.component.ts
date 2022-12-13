import { P } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FilterPopupComponent } from 'src/app/shared/components/filter-popup/filter-popup.component';
import { FilterData } from 'src/app/shared/models/filter-data.model';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ProviderRequest } from 'src/app/shared/models/provider-request.model';
import { ProvidersRequest } from 'src/app/shared/models/providers-request.model';
import { Service } from 'src/app/shared/models/service.model';
import { ServicesRequest } from 'src/app/shared/models/services-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';


@Component({
  selector: 'app-unauthenticated-view-services',
  templateUrl: './unauthenticated-view-services.component.html',
  styleUrls: ['./unauthenticated-view-services.component.css']
})
export class UnauthenticatedViewServicesComponent implements OnInit {
  @ViewChild('paginator')
  pager!: MatPaginator;

  filterData: FilterData = {category: ""};
  sortedServices: Service[] = [];
  sortSelected: string = "";
  typeSelected: string = "";


  constructor(public dialog: MatDialog, private router: Router, private apiClient: ApiClientService) { }

  ngOnInit(): void {
    //this.isLoading = false;
    this.loadServices();
  }


  loadServices() {
    this.sortedServices = this.apiClient.approvedServices;
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
    dialogRef.afterClosed().subscribe((result: FilterData) => {
      console.log('The dialog was closed', result);
      // Make sure the popup returns data (it won't if the hit 'no thanks', and we do not want 
      //   to set the filter data to undefined. We want it to be the old filter data)
      if(result) {
        this.filterData = result;
        this.filterServices();
      } else {
        this.filterServices();
      }
    });
  }

  getUser(userID: string) {
    return this.apiClient.providers.find(p => p._id == userID);
  }


  sortChange(e: any) {
    this.sortSelected = e.value;
    this.sortServices();
  }

  roundRating(x: number) {
    return Math.round(x * 100) / 100;
  }

  sortServices() {
    if(this.sortSelected == "ratings") {
      this.sortedServices.sort((a, b) => {return b.ratings - a.ratings});
    } else if(this.sortSelected == "recent") {
      this.sortedServices.sort((a, b) => {return b.createdAt! < a.createdAt! ? 1 : -1});
    }
  }


  typeChange(e: any) {
    this.typeSelected = e.value;
    this.filterServices();
  }


  filterServices() {
    this.sortedServices = this.apiClient.approvedServices;
    if(this.filterData && this.filterData.category.length > 0) {
      this.sortedServices = this.sortedServices.filter(p => p.category == this.filterData.category);
    }

    if(this.typeSelected.length > 0) {
      this.sortedServices = this.sortedServices.filter(p => p.type == this.typeSelected);
    }

    this.sortServices();
  }

  searchChange(e: any) {
    this.apiClient.getApprovedServices().subscribe({
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


  viewService(_service: Service) {
    this.router.navigate(['/service-details'], {state: _service});
  }
}
