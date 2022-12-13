import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ProvidersRequest } from 'src/app/shared/models/providers-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';

@Component({
  selector: 'app-admin-approve-providers',
  templateUrl: './admin-approve-providers.component.html',
  styleUrls: ['./admin-approve-providers.component.css']
})
export class AdminApproveProvidersComponent {
  
  isLoading: boolean = true;
  providers: ProviderAccount[] = [];
  displayedColumns: string[] = ['icon', 'id', 'username', 'fname', 'lname', 'approve', 'deny'];
  avatars: AccountCloudImage[] = [];

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
          let temp: AccountCloudImage = {
            accountId: obj._id!,
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


  denyProvider(obj: ProviderAccount) {
    this.apiClient.deleteProvider(obj).subscribe({
      next: (res: any) => {
        console.log(res);
        this.snackBar.open("Delete Success", "", {
          duration: 1000,
          panelClass: ['green-snackbar'],
        }).afterDismissed().subscribe(() => {
          this.loadData();
        });
      }, error: (err: any) => {
        alert('Error deleting/denying provider, see console for details.');
        console.log(err);
      }
    })
  }

  getProviderIcon(provider: ProviderAccount) {
    return this.avatars.find(p => p.accountId === provider._id)!.img;;
  }
}





export interface AccountCloudImage {
  accountId: string,
  img: CloudinaryImage
}