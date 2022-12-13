import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/shared/models/service.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-provider-home',
  templateUrl: './provider-home.component.html',
  styleUrls: ['./provider-home.component.css']
})
export class ProviderHomeComponent implements OnInit {

  services: Service[] =[];

  constructor(private apiClient: ApiClientService, private router: Router) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.services = this.apiClient.approvedServices.filter(p => p.user == this.apiClient.providerAccount._id);
  }

  /**
   * Navigate to the service details page
   * @param selectedService The service data to send to the service details page
   */
  viewService(selectedService: Service) {
    this.router.navigate(['/home/service-edit'], {state: selectedService});
  }

  roundRating(x: number) {
    return Math.round(x * 100) / 100;
  }
}
