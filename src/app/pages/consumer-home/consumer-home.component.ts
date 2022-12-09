import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { Chat } from 'src/app/shared/models/chat.model';
import { Service } from 'src/app/shared/models/service.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';

@Component({
  selector: 'app-consumer-home',
  templateUrl: './consumer-home.component.html',
  styleUrls: ['./consumer-home.component.css']
})
export class ConsumerHomeComponent implements OnInit {

  filteredServices: Service[] = [];

  constructor(public apiClient: ApiClientService, private router: Router, private cloudService: CloudinaryService) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.filteredServices = this.apiClient.approvedServices.filter(p => {
      for(let obj of this.apiClient.consumerAccount.interests!) {
        if(p.tags.includes(obj)) {
          return true;
        }
      }
      return false;
    })
  }


  getInterestsAligned(_tags: string[]) {
    let result = "";
    for(let tag of _tags) {
      if(this.apiClient.consumerAccount.interests!.includes(tag)) {
        result += result.length == 0 ? tag : ", " + tag;
      }
    }
    return result;
  }

  getUser(userID: string) {
    return this.apiClient.providers.find(p => p._id == userID);
  }

  /**
   * Navigate to the service details page
   * @param selectedService The service data to send to the service details page
   */
  viewService(selectedService: Service) {
    this.router.navigate(['/home/service-details'], {state: selectedService});
  }
}
