import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  sideNavOpened: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, public apiClient: ApiClientService) { }

  ngOnInit(): void {
  }

  navigateHome() {
    // Check if provider or consumer to naviagte to correct home page
    if(this.apiClient.consumerAccount) {
      this.router.navigate(['consumer-home'], {relativeTo: this.route});
    } else if(this.apiClient.providerAccount) {
      this.router.navigate(['provider-home'], {relativeTo: this.route});
    } else if(this.apiClient.adminAccount) {
      this.router.navigate(['admin-home'], {relativeTo: this.route});
    }
  }

  navigateViewAll() {
    this.router.navigate(['consumer-view-all'], {relativeTo: this.route});
  }

  navigateAddService() {
    this.router.navigate(['add-service'], {relativeTo: this.route});
  }

  navigateProfile() {
    this.router.navigate(['profile-edit'], {relativeTo: this.route});
  }

  navigateViewPayments() {
    this.router.navigate(['consumer-payments'], {relativeTo: this.route});
  }

  navigateViewProviderHistory() {
    this.router.navigate(['provider-history'], {relativeTo: this.route});
  }

  navigateViewProviderPending() {
    this.router.navigate(['provider-pending'], {relativeTo: this.route});
  }
}
