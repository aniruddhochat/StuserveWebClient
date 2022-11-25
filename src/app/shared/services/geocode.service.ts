import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoLocation } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  private geocoder: any = new google.maps.Geocoder();

  // Create a bounding box with sides ~10km away from the center point
  center = { lat: 39.16, lng: -86.53 };
  defaultBounds = {
    north: this.center.lat + 0.1,
    south: this.center.lat - 0.1,
    east: this.center.lng + 0.1,
    west: this.center.lng - 0.1,
  };
  input = document.getElementById("pac-input") as HTMLInputElement;
  options = {
    bounds: this.defaultBounds,
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["establishment"],
  };

  autocomplete = new google.maps.places.Autocomplete(this.input, this.options);

  constructor() { }


  geocodeAddress(location: string): Observable<GeoLocation>{
    return new Observable(observer => {
      this.geocoder.geocode({'address': location}, (results: any, status: any) => {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log('Geocoding complete!');
          observer.next({
            lat: parseInt(results[0].geometry.location.lat(), 10), 
            lng: parseInt(results[0].geometry.location.lng(), 10)
          });
        } else {
            console.log('Error - ', results, ' & Status - ', status);
            observer.next({ lat: 0, lng: 0 });
        }
        observer.complete();
      });
    })      
  }


  getAutoPlaces() {
    console.log(this.autocomplete.getPlace());
  }
  

}


