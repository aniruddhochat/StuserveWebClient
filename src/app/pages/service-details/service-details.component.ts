import { formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CloudinaryImage } from '@cloudinary/url-gen';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ReviewPopupComponent } from 'src/app/shared/components/review-popup/review-popup.component';
import { StripeFormComponent } from 'src/app/shared/components/stripe-form/stripe-form.component';
import { GeoLocation } from 'src/app/shared/models/location.model';
import { Order } from 'src/app/shared/models/order.model';
import { PayementRequest } from 'src/app/shared/models/payement-request.model';
import { Service } from 'src/app/shared/models/service.model';
import { ServicesRequest } from 'src/app/shared/models/services-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';
import { GeocodeService } from 'src/app/shared/services/geocode.service';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('map',{static: false}) mapElement!: ElementRef;

  isAuthenticated: boolean = false;

  map!: google.maps.Map;

  displayedColumns: string[] = ['rating', 'name', 'comment'];

  @ViewChild('paginator') paginator!: MatPaginator;

  avatar?: CloudinaryImage;

  
  constructor(private router: Router, public dialog: MatDialog, private apiClient: ApiClientService, private geoService: GeocodeService, private cloudService: CloudinaryService) { 
    
  }

  // Assigning the passed service object through navigation
  service: Service = this.router.getCurrentNavigation()!.extras.state as Service;
  dataSource = new MatTableDataSource<{
    user: string,
    rating: number,
    comment: string,
    name: string
}>(this.service.reviews);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    console.log(this.paginator);
  }


  ngOnInit(): void {
    const user = this.apiClient.providers.find(p => p._id == this.service.user);
    if(user && user.avatar) {
      this.avatar = this.cloudService.getImage(user.avatar.public_id, 25, 25);
    } else {
      this.avatar = this.cloudService.getDefaultImage(25, 25);
    }
    
    //this.stripePayment();
    // Check if user is authenticated and set corresponding variable
    this.checkAuthenticated();
    // Now get geocode address and init map
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


  checkAuthenticated() {
    this.isAuthenticated = this.apiClient.authenticated();
  }

  formatDate(date: Date) {
    return moment(date).format('MMMM Do YYYY, h:mm a');
  }

  openReview() {
    // Open dialog and send options
    const dialogRef = this.dialog.open(ReviewPopupComponent, {
      width: '500px',
      data: this.service
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.apiClient.getApprovedServices().subscribe({
        next: (res: ServicesRequest) => {
          this.apiClient.approvedServices = res.services;
          this.service = res.services.find(p => p._id == this.service._id) as Service;
          this.dataSource.data = this.service.reviews;
        }, error: (err: any) => {
          alert('Error reloading service, check console.');
          console.log(err);
        }
      })
    });
  }


  openStripe() {
    const dialogRef = this.dialog.open(StripeFormComponent, {
      // height: 'fit-content',
      width: '600px',
      data: this.service.price
    });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        console.log(res);
        if(res) {
          this.apiClient.postStripePayement(this.service.price, res.token.id).subscribe({
            next: (res2:any) => {
              console.log(res2);
              // After succesful charge posting, attempt to create an order
              //  If that succeeds, then capture the charge
              let newOrder: Order = {
                deliveringOrderInfo: {
                  address: this.apiClient.consumerAccount.address,
                  phoneNo: this.apiClient.consumerAccount.phone
                },
                orderService: {
                  name: this.service.name,
                  price: this.service.price,
                  image: 'temp',
                  product: this.service._id!
                },
                paymentInfo: {
                  id: res2.charge.id,  // Not sure what to put?
                  status: 'Uncaptured'
                },
                servicePrice: this.service.price,
                taxPrice: 0,
                additionalPrice: 0,
                totalPrice: this.service.price,
                provider: this.service.user
              };
              // Attempt to post the new order
              this.apiClient.postNewOrder(newOrder).subscribe({
                next: (res: any) => {
                  console.log(res);
                  alert("Succesfully created order, awaiting approval from provider");
                }, error: (err: any) => {
                  alert("Error creating order. Check console for details.");
                  console.log(err);
                }
              })
            }, error: (err: any) => {
              console.log(err);
            }
          });
        }
      }, error: (err: any) => {
        alert('something went wrong. Check console');
        console.log(err);
      }
    })
  }


  getUser(userID: string) {
    const user = this.apiClient.providers.find(p => p._id == userID);
    return user;
  }


  roundRating(x: number) {
    return Math.round(x * 100) / 100;
  }
}
