import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/shared/models/service.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  // Holds the service object for this page
  service: Service = null!;
  
  sideNavOpened: boolean = false;

  constructor(private router: Router) { 
    // Assigning the passed service object through navigation
    this.service = this.router.getCurrentNavigation()!.extras.state as Service;
  }

  ngOnInit(): void {
    
  }

}
