import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/shared/models/service.model';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.css']
})
export class ServiceViewComponent implements OnInit {
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
