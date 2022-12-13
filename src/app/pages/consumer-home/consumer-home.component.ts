import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
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

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;

  filteredServices: Service[] = [];

  interestsLoading: boolean = false;

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


  roundRating(x: number) {
    return Math.round(x * 100) / 100;
  }


  /**
   * Add function for the chip list
   */
   add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim().toLowerCase();
    // Add the input string
    if (value) {
      this.interestsLoading = true;
      this.apiClient.consumerAccount.interests!.push(value);
      this.apiClient.updateConsumer(this.apiClient.consumerAccount).subscribe({
        next: (res: any) => {
          this.interestsLoading = false;
          // Clear the input value
          event.chipInput!.clear();
          this.loadServices();
        }, error: (err: any) => {
          alert('Error updating account with new interest. Check console.');
          console.log(err);
          this.interestsLoading = false;
          // Clear the input value
          event.chipInput!.clear();
        }
      })
    }
  }

  /**
   * Remove function for the chip list
   */
  remove(value: string): void {
    const index = this.apiClient.consumerAccount.interests!.indexOf(value);
    if (index >= 0) {
      this.interestsLoading = true;
      this.apiClient.consumerAccount.interests!.splice(index, 1);
      this.apiClient.updateConsumer(this.apiClient.consumerAccount).subscribe({
        next: (res: any) => {
          this.interestsLoading = false;
          this.loadServices();
        }, error: (err: any) => {
          alert('Error updating account with removal of interest. Check console.');
          console.log(err);
          this.interestsLoading = false;
        }
      })
    }
  }
}
