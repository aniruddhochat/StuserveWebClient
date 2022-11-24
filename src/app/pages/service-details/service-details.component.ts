import { formatDate } from '@angular/common';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ReviewPopupComponent } from 'src/app/shared/components/review-popup/review-popup.component';
import { Service } from 'src/app/shared/models/service.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  
  constructor(private router: Router, public dialog: MatDialog, private apiClient: ApiClientService) { 
    
  }

  // Assigning the passed service object through navigation
  service = this.router.getCurrentNavigation()!.extras.state as Service;

  geocoder = new google.maps.Geocoder();

  center: {lat: number, lng: number} = {
    lat: 0,
    lng: 0
  };

  //sideNavOpened: boolean = false;
  mapOptions: google.maps.MapOptions = {
    //center: {lat: 40, lng: -20},
    zoom: 4,
  };



  marker = {
    position: {
      lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
      lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
    },
    label: {
      color: 'red',
      text: 'Marker label ',
    },
    title: 'Marker title ',
    options: { animation: google.maps.Animation.BOUNCE },
  };



  ngOnInit(): void {
    this.getGeoLocation('8310 Fall Creek Rd Indianapolis, IN  46256 United States').subscribe({
      next: (res: any) => {
        console.log(res);
      }
    })
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
    return this.apiClient.providers.find(p => p._id == userID);
  }



  getGeoLocation(address: string): Observable<any> {
    console.log('Getting address: ', address);
    let geocoder = new google.maps.Geocoder();
    return new Observable(observer => {
        geocoder.geocode({
            'address': address
        }, (results: any, status: any) => {
            if (status == google.maps.GeocoderStatus.OK) {
                observer.next(results[0].geometry.location);
                observer.complete();
            } else {
                console.log('Error: ', results, ' & Status: ', status);
                observer.error();
            }
        });
    });
}
}
