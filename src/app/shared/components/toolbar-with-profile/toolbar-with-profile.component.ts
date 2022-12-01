import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { CloudinaryService } from '../../services/cloudinary.service';


@Component({
  selector: 'app-toolbar-with-profile',
  templateUrl: './toolbar-with-profile.component.html',
  styleUrls: ['./toolbar-with-profile.component.css']
})
export class ToolbarWithProfileComponent implements OnInit {

  avatar?: CloudinaryImage;

  constructor(public apiClient: ApiClientService, private cloudService: CloudinaryService) { }

  ngOnInit(): void {
    let account = this.apiClient.consumerAccount ? this.apiClient.consumerAccount : this.apiClient.providerAccount;
    this.avatar = this.cloudService.getImage(account.avatar!.public_id, 45, 45);
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
