import { Component, OnInit, Provider } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ProvidersRequest } from 'src/app/shared/models/providers-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  
  isLoading: boolean = true;
  providers: ProviderAccount[] = [];
  displayedColumns: string[] = ['icon', 'id', 'username', 'fname', 'lname', 'button'];
  avatars: ProviderCloudImage[] = [];

  constructor(private apiClient: ApiClientService, private cloudService: CloudinaryService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.providers = [];
    this.avatars = [];
    this.isLoading = true;
    this.apiClient.getPendingProviders().subscribe({
      next: (res: ProvidersRequest) => {
        this.providers = res.providers;
        res.providers.forEach(obj => {
          let temp: ProviderCloudImage = {
            providerId: obj._id!,
            img: this.cloudService.getImage(obj.avatar!.public_id, 50, 50)
          };
          this.avatars.push(temp);
        });
        console.log(this.avatars);
        this.isLoading = false;
      }, error: (err: any) => {
        alert('Error getting providers. See console for details');
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  approveProvider(obj: ProviderAccount) {
    this.apiClient.approveProvider(obj).subscribe({
      next: (res: any) => {
        console.log(res);
        this.snackBar.open("Approval Success", "", {
          duration: 1000,
          panelClass: ['green-snackbar'],
        }).afterDismissed().subscribe(() => {
          this.loadData();
        });
      }, error: (err: any) => {
        alert('Error approving provider, see console for details.');
        console.log(err);
      }
    })
  }

  getProviderIcon(provider: ProviderAccount) {
    return this.avatars.find(p => p.providerId === provider._id)!.img;;
  }
}





export interface ProviderCloudImage {
  providerId: string,
  img: CloudinaryImage
}