import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/shared/models/service.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-consumer-home',
  templateUrl: './consumer-home.component.html',
  styleUrls: ['./consumer-home.component.css']
})
export class ConsumerHomeComponent implements OnInit {

  filteredServices: Service[] = [];

  constructor(public apiClient: ApiClientService) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.filteredServices = this.apiClient.services.filter(p => {
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
}
