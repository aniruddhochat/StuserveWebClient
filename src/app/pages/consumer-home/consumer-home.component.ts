import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterPopupComponent } from 'src/app/shared/components/filter-popup/filter-popup.component';
import { FilterData } from 'src/app/shared/models/filter-data';
import { Service } from 'src/app/shared/models/service.model';

@Component({
  selector: 'app-consumer-home',
  templateUrl: './consumer-home.component.html',
  styleUrls: ['./consumer-home.component.css']
})
export class ConsumerHomeComponent implements OnInit {

  sideNavOpened: boolean = false;
  filterData: FilterData = {temp1: "Test1", temp2: "Test2"};

  /****************************************************
   ****        TEMPORARY SERVICE OBJECTS           ****
   ****************************************************/
  tempServices: Service[] = [
    {
      id: 1,
      name: "Landscaping",
      description: "Professional landscaping work in the Bloomington area. Everything from lawnmowing to bush trimming at low costs. All equiptment required is already provided.",
      providerName: "John Synder",
      cost: 80
    },
    {
      id: 2,
      name: "Math Tutoring",
      description: "Hello, I am a Senior majoring in Mathmatics looking to gain some experience in teaching. I wish to become a College proffesor in mathmatics after I graduate. I currently have TA'd in numerous crucial Mathmatics courses, so I am just hoping to expand my strong portfolio by helping out my fellow colleagues.",
      providerName: "Rachel Fisher",
      cost: 20
    },
    {
      id: 3,
      name: "Dog Sitting",
      description: "I am currently studying and training to be a Veterinarian and dog trainer. I have a lot of free time on my hands, and would like to use my expertise to gain some extra money on the side. Message me for availability, and I will take good care of your dogs.",
      providerName: "Elizabeth Reed",
      cost: 40
    },
    {
      id: 4,
      name: "Haircuts",
      description: "My name in Todd Parish, I currently work part time at a barbershop here in Bloomington alongside finish my degree in Cosmotology school. I offer low prices and flexible availability. I currently operate out of my own house, but present the option to come to you if preferred. Message me for details.",
      providerName: "Todd Parish",
      cost: 10
    },
  ];
  // **************************************************


  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
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
    this.router.navigate(['/home/service-view'], {state: selectedService});
  }
}
