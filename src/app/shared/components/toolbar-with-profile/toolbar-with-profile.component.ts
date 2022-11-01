import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-toolbar-with-profile',
  templateUrl: './toolbar-with-profile.component.html',
  styleUrls: ['./toolbar-with-profile.component.css']
})
export class ToolbarWithProfileComponent implements OnInit {

  constructor(public apiClient: ApiClientService) { }

  ngOnInit(): void {
  }

  getEmail() {
    if(this.apiClient.consumerAccount) {
      return this.apiClient.consumerAccount.email;
    } else if (this.apiClient.providerAccount) {
      return this.apiClient.providerAccount.email;
    } else {
      return "N/A";
    }
  }
}
