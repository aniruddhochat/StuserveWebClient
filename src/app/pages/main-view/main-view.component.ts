import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterPopupComponent } from 'src/app/shared/components/filter-popup/filter-popup.component';
import { Service } from 'src/app/shared/models/service.model';
import { ServicesRequest } from 'src/app/shared/models/services-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

export interface FilterData {
  temp1: string;
  temp2: string;
}

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  sideNavOpened: boolean = false;
  filterData: FilterData = {temp1: "Test1", temp2: "Test2"};
  services: Service[] = [];

  constructor(public dialog: MatDialog, private router: Router, private apiClient: ApiClientService) { }

  ngOnInit(): void {
    this.loadServices();
  }


  loadServices() {
    // reset services array
    this.services = [];
    // Call API to get all services in the DB
    this.apiClient.getServices().subscribe({
      next: (res: ServicesRequest) => {
        // Check successful variable
        if(res.success) {
          // Succesfully got the services, now set the services variable
          this.services = res.services;
        } else {
          alert("Services request variable shows non-successful");
          this.services = res.services;
        }
      }, error: (err: any) => {
        // Error retrieving services
        alert("error getting services");
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

  /**
   * Navigate to the service details page
   * @param selectedService The service data to send to the service details page
   */
  viewService(selectedService: Service) {
    this.router.navigate(['/home/service-details'], {state: selectedService});
  }
}
