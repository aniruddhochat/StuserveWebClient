import { formatDate } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  @ViewChild('map',{static: false}) mapElement!: ElementRef;

  map!: google.maps.Map;
  
  constructor(private router: Router, public dialog: MatDialog, private apiClient: ApiClientService, private geoService: GeocodeService) { 
    
  }

  // Assigning the passed service object through navigation
  service: Service = this.router.getCurrentNavigation()!.extras.state as Service;


  ngOnInit(): void {
    console.log('Getting address: ', this.service.location);
    this.geoService.geocodeAddress(this.service.location).subscribe({
      next: (res: GeoLocation) => {
        console.log(res);
        const mapOptions: google.maps.MapOptions = {
          center: {lat: res.lat, lng: res.lng},
          zoom: 12,
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        const marker = new google.maps.Marker({
          position: {lat: res.lat, lng: res.lng}, 
          map: this.map, 
          title: this.service.name
        });
          const infoWindow = new google.maps.InfoWindow({
            content: `<p>${this.service.name}</p>
                      <p>${this.service.type}</p>
                      <p>${this.service.numOfReviews} reviews</p>
                      <p>${this.service.ratings}/5</p>
                      <p>${this.service.location}</p>
                      <p>${res.lat}, ${res.lng}</p>`
          });
          marker.addListener("click", () => {
            infoWindow.open({
              anchor: marker
            });
          });
      }, error: (err: any) => {
        alert('error loading map location for the service');
        console.log(err);
      }
    })
  }

  mapInit(){
    
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
}
