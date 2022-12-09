import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ProvidersRequest } from 'src/app/shared/models/providers-request.model';
import { Service } from 'src/app/shared/models/service.model';
import { ServicesRequest } from 'src/app/shared/models/services-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';
import { ProviderCloudImage } from '../admin-approve-providers/admin-approve-providers.component';

@Component({
  selector: 'app-admin-approve-services',
  templateUrl: './admin-approve-services.component.html',
  styleUrls: ['./admin-approve-services.component.css']
})
export class AdminApproveServicesComponent {
 
  isLoading: boolean = true;
  services: Service[] = [];
  displayedColumns: string[] = ['id', 'name', 'type', 'category', 'createdAt', 'button'];
  //avatars: ProviderCloudImage[] = [];

  constructor(private apiClient: ApiClientService, private cloudService: CloudinaryService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.services = [];
    //this.avatars = [];
    this.isLoading = true;
    this.apiClient.getPendingServices().subscribe({
      next: (res: ServicesRequest) => {
        this.services = res.services;
        // res.services.forEach(obj => {
        //   let temp: ProviderCloudImage = {
        //     providerId: obj._id!,
        //     img: this.cloudService.getImage(obj.avatar!.public_id, 50, 50)
        //   };
        //   this.avatars.push(temp);
        // });
        //console.log(this.avatars);
        this.isLoading = false;
      }, error: (err: any) => {
        alert('Error getting services. See console for details');
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  approveService(obj: Service) {
    this.apiClient.approveService(obj).subscribe({
      next: (res: any) => {
        console.log(res);
        this.snackBar.open("Approval Success", "", {
          duration: 1000,
          panelClass: ['green-snackbar'],
        }).afterDismissed().subscribe(() => {
          this.loadData();
        });
      }, error: (err: any) => {
        alert('Error approving service, see console for details.');
        console.log(err);
      }
    })
  }

  // getProviderIcon(provider: ProviderAccount) {
  //   return this.avatars.find(p => p.providerId === provider._id)!.img;;
  // }
}





// export interface ProviderCloudImage {
//   providerId: string,
//   img: CloudinaryImage
// }