import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { OrdersRequest } from 'src/app/shared/models/orders-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-provider-pending',
  templateUrl: './provider-pending.component.html',
  styleUrls: ['./provider-pending.component.css']
})
export class ProviderPendingComponent implements OnInit{

  isLoading: boolean = true;
  orders: Order[] = [];
  displayedColumns: string[] = ['name', 'serviceName', 'price', 'processedAt', 'button'];

  constructor(private apiClient: ApiClientService) {};

  ngOnInit(): void {
    this.apiClient.getProviderOrders().subscribe({
      next: (res: OrdersRequest) => {
        console.log(res);
        this.orders = res.orders.filter(p => p.orderStatus?.toLowerCase().trim() == 'pending');
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


  approveOrder(e: Order) {
    this.apiClient.approveOrder(e._id!, e.paymentInfo.id).subscribe({
      next: (res: any) => {
        alert("Succesfully completed order");
        this.orders = this.orders.filter(p => p._id != e._id);
      }, error: (err: any) => {
        alert("Error completing order. Check console for details");
        console.log(err);
      }
    })
  }
}
