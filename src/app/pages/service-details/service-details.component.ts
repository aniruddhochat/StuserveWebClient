import { formatDate } from '@angular/common';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ReviewPopupComponent } from 'src/app/shared/components/review-popup/review-popup.component';
import { GeoLocation } from 'src/app/shared/models/location.model';
import { Service } from 'src/app/shared/models/service.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { GeocodeService } from 'src/app/shared/services/geocode.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  
  constructor(private router: Router, public dialog: MatDialog, private apiClient: ApiClientService, private geoService: GeocodeService) { 
    
  }

  // Assigning the passed service object through navigation
  service = this.router.getCurrentNavigation()!.extras.state as Service;

  geocoder = new google.maps.Geocoder();

  //sideNavOpened: boolean = false;
  mapOptions: google.maps.MapOptions = {
    center: {lat: 0, lng: 0},
    zoom: 4,
  };



  marker = {
    position: {
      lat: 0,
      lng: 0,
    },
    label: {
      color: 'red',
      text: 'Marker label ',
    },
    title: 'Marker title ',
    options: { animation: google.maps.Animation.BOUNCE },
  };



  ngOnInit(): void {
    this.getGeoLocation('8310 Fall Creek Rd Indianapolis, Indiana, 46256 United States');
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



  getGeoLocation(address: string) {
    console.log('Getting address: ', address);
    this.geoService.geocodeAddress(address).subscribe({
      next: (res: any) => {
        this.updateMap(res);
      }, error: (err: any) => {
        alert('error loading map location for the service');
        console.log(err);
      }
    })
  }


  /**
   * Updates the map variables with the new center location values
   */
  updateMap(location: GeoLocation) {
    this.mapOptions = {
      center: location,
      zoom: 10,
    };
  
    this.marker = {
      position: {
        lat: location.lat,
        lng: location.lng,
      },
      label: {
        color: 'red',
        text: 'Marker label ',
      },
      title: 'Marker title ',
      options: { animation: google.maps.Animation.BOUNCE },
    };
  }
}
