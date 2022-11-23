import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ReviewPopupComponent } from 'src/app/shared/components/review-popup/review-popup.component';
import { Service } from 'src/app/shared/models/service.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  
  //sideNavOpened: boolean = false;

  constructor(private router: Router, public dialog: MatDialog, private apiClient: ApiClientService) { 
    
  }

  // Assigning the passed service object through navigation
  service = this.router.getCurrentNavigation()!.extras.state as Service;

  ngOnInit(): void {
    
  }

  formatDate(date: Date) {
    return moment(date).format('MMMM Do YYYY, h:mm a');
  }

  openReview() {
    // Open dialog and send options
    const dialogRef = this.dialog.open(ReviewPopupComponent, {
      width: '250px',
      data: this.service
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.service = this.apiClient.services.find(p => p._id == this.service._id) as Service;
    });
  }


  getUser(userID: string) {
    console.log(userID);
    console.log(this.service);
    return this.apiClient.providers.find(p => p._id == userID);
  }
}
