import { Component, OnInit, Provider } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpTypeSelectComponent } from 'src/app/shared/components/sign-up-type-select/sign-up-type-select.component';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ProvidersRequest } from 'src/app/shared/models/providers-request.model';
import { Service } from 'src/app/shared/models/service.model';
import { ServicesRequest } from 'src/app/shared/models/services-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  topSixServices: Service[] = [];
  providerDetails: ProviderAccount[] = [];

  isLoading: boolean = false;

  constructor(public dialog: MatDialog, public apiClient: ApiClientService) { }

  ngOnInit(): void {
    this.loadTopServices();
  }

  loadTopServices() {
    this.topSixServices = this.apiClient.services.slice().sort((a, b) => {return b.ratings - a.ratings}).slice(0, 6);
  }

  signUpClick() {
    let dialogRef = this.dialog.open(SignUpTypeSelectComponent, {
      height: 'fit-content',
      width: '750px',
    });
  }

  getUser(userID: string) {
    return this.apiClient.providers.find(p => p._id == userID);
  }
}
