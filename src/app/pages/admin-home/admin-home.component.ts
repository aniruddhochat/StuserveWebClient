import { Component, OnInit, Provider } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { AddCategoryComponent } from 'src/app/shared/components/add-category/add-category.component';
import { CategoriesRequest } from 'src/app/shared/models/categories-request.model';
import { CategoryRequest } from 'src/app/shared/models/category-request.model';
import { Category } from 'src/app/shared/models/category.model';
import { ConsumerAccount } from 'src/app/shared/models/consumer-account.model';
import { ConsumersRequest } from 'src/app/shared/models/consumers-request.model';
import { Order } from 'src/app/shared/models/order.model';
import { OrdersRequest } from 'src/app/shared/models/orders-request.model';
import { ProviderAccount } from 'src/app/shared/models/provider-account.model';
import { ProvidersRequest } from 'src/app/shared/models/providers-request.model';
import { Service } from 'src/app/shared/models/service.model';
import { ServicesRequest } from 'src/app/shared/models/services-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';
import { AccountCloudImage } from '../admin-approve-providers/admin-approve-providers.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  isLoading: boolean = true;
  section: string = 'services';
  avatars: AccountCloudImage[] = [];

  constructor(private apiClient: ApiClientService, private cloudService: CloudinaryService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  defaultAvatar: CloudinaryImage = this.cloudService.getDefaultImage(45, 45);

  services: Service[] = [];
  consumers: ConsumerAccount[] = [];
  providers: ProviderAccount[] = [];
  orders: Order[] = [];
  categories: Category[] = [];
  displayedServiceColumns: string[] = ['id', 'name', 'type', 'category', 'createdAt', 'button'];
  displayedAccountColumns: string[] = ['icon', 'id', 'username', 'email', 'fname', 'lname', 'button'];
  displayedOrderColumns: string[] = ['id', 'serviceName', 'provider', 'consumer', 'price', 'status', 'button'];
  displayedCategoryColumns: string[] = ['id', 'name', 'description', 'button'];




  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.services = [];
    this.consumers = [];
    this.providers = [];
    this.orders = [];
    this.categories = [];
    // Initialize data
    this.apiClient.getAllOrders().subscribe({
      next: (res: OrdersRequest) => {
        this.orders = res.orders;
        this.apiClient.getAllServices().subscribe({
          next: (res: ServicesRequest) => {
            this.services = res.services;
            this.apiClient.getAllConsumerDetails().subscribe({
              next: (res: ConsumersRequest) => {
                this.consumers = res.users;
                res.users.forEach(obj => {
                  let temp: AccountCloudImage = {
                    accountId: obj._id!,
                    img: this.cloudService.getImage(obj.avatar!.public_id, 50, 50)
                  };
                  this.avatars.push(temp);
                });
                this.apiClient.getAllProviderDetails().subscribe({
                  next: (res: ProvidersRequest) => {
                    this.providers = res.providers;
                    res.providers.forEach(obj => {
                      let temp: AccountCloudImage = {
                        accountId: obj._id!,
                        img: this.cloudService.getImage(obj.avatar!.public_id, 50, 50)
                      };
                      this.avatars.push(temp);
                    });
                    this.apiClient.getCategories().subscribe({
                      next: (res: CategoriesRequest) => {
                        this.categories = res.category;
                        this.isLoading = false;
                      }, error: (err: any) => {
                        alert('Error loading categories, check console for details.');
                        console.log(err);
                      }
                    })
                  }, error: (err: any) => {
                    alert('Error getting providers, check console for details.');
                    console.log(err);
                    this.isLoading = false;
                  }
                });
              }, error: (err: any) => {
                alert('Error getting consumers, check console for details.');
                console.log(err);
                this.isLoading = false;
              }
            });
          }, error: (err: any) => {
            alert('Error getting services, check console for details.');
            console.log(err);
            this.isLoading = false;
          }
        });
      }, error: (err: any) => {
        alert('Error getting orders, check console for details.');
        console.log(err);
        this.isLoading = false;
      }
    })
  }



  sectionChanged(e: any) {
    let val = e.value;
    this.section = val;
  }

  getAccountIcon(_accountID: string) {
    const temp = this.avatars.find(p => p.accountId === _accountID);
    return temp ? temp.img : this.defaultAvatar;
  }

  getConsumerEmail(_consumer: string) {
    const acct = this.consumers.find(p => p._id === _consumer);
    return acct ? acct.email : 'N/A';
  }

  getProviderEmail(_provider: string) {
    const acct = this.providers.find(p => p._id === _provider);
    return acct ? acct.email : 'N/A';
  }


  deleteService(_service: Service) {
    this.apiClient.deleteService(_service).subscribe({
      next: (res: any) => {
        this.loadData();
        this.snackBar.open('Success', '', {
          duration: 1000
        });
      }, error: (err: any) => {
        alert('Error deleting services, check console.');
        console.log(err);
      }
    })
  }

  deleteConsumer(_consumer: ConsumerAccount) {
    this.apiClient.deleteConsumer(_consumer).subscribe({
      next: (res: any) => {
        this.loadData();
        this.snackBar.open('Success', '', {
          duration: 1000
        });
      }, error: (err: any) => {
        alert('Error deleting consumer, check console.');
        console.log(err);
      }
    })
  }

  deleteProvider(_provider: ProviderAccount) {
    this.apiClient.deleteProvider(_provider).subscribe({
      next: (res: any) => {
        this.loadData();
        this.snackBar.open('Success', '', {
          duration: 1000
        });
      }, error: (err: any) => {
        alert('Error deleting provider, check console.');
        console.log(err);
      }
    })
  }

  deleteOrder(_order: Order) {
    this.apiClient.deleteOrder(_order).subscribe({
      next: (res: any) => {
        this.loadData();
        this.snackBar.open('Success', '', {
          duration: 1000
        });
      }, error: (err: any) => {
        alert('Error deleting order, check console.');
        console.log(err);
      }
    })
  }

  deleteCategory(_category: Category) {
    this.apiClient.deleteCategory(_category).subscribe({
      next: (res: any) => {
        this.loadData();
        this.snackBar.open('Success', '', {
          duration: 1000
        });
      }, error: (err: any) => {
        alert('Error deleting category, check console.');
        console.log(err);
      }
    })
  }

  addCategory() {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      height: 'fit-content',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      // Reload categories
      this.categories = [];
      this.apiClient.getCategories().subscribe({
        next: (res: CategoriesRequest) => {
          this.categories = res.category;
        }, error: (err: any) => {
          alert('Error loading categories, see console for details');
          console.log(err);
        }
      })
    });
  }
}