import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { OrdersRequest } from 'src/app/shared/models/orders-request.model';
import { ApiClientService } from 'src/app/shared/services/api-client.service';

@Component({
  selector: 'app-consumer-payments',
  templateUrl: './consumer-payments.component.html',
  styleUrls: ['./consumer-payments.component.css']
})
export class ConsumerPaymentsComponent implements OnInit{

  isLoading: boolean = true;
  orders: Order[] = [];
  displayedColumns: string[] = ['name', 'price', 'processedAt', 'status'];

  constructor(private apiClient: ApiClientService) {};

  ngOnInit(): void {
    this.apiClient.getConsumerOrders().subscribe({
      next: (res: OrdersRequest) => {
        this.orders = res.orders;
        this.isLoading = false;
      }, error: (err: any) => {
        alert("Error getting your orders. Check console for details.");
        console.log(err);
      }
    })
  }

}
