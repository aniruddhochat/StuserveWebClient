import { Component } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { OrdersRequest } from 'src/app/shared/models/orders-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-provider-history',
  templateUrl: './provider-history.component.html',
  styleUrls: ['./provider-history.component.css']
})
export class ProviderHistoryComponent {


  isLoading: boolean = true;
  orders: Order[] = [];
  displayedColumns: string[] = ['name', 'serviceName', 'price', 'completedAt', 'status'];

  constructor(private apiClient: ApiClientService) {};

  ngOnInit(): void {
    this.apiClient.getProviderOrders().subscribe({
      next: (res: OrdersRequest) => {
        console.log(res);
        this.orders = res.orders.filter(p => p.orderStatus?.toLowerCase().trim() == 'completed');
        this.isLoading = false;
      }, error: (err: any) => {
        alert("Error getting your orders. Check console for details.");
        console.log(err);
      }
    })
  }


  getConsumerEmail(_userid: string) {
    return this.apiClient.consumers.find(p => p._id == _userid)?.email;
  }
}
