import { Subscription } from 'rxjs';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  createOrderSubscription!: Subscription;
  orderListSubscription!: Subscription;
  isLoaded!: boolean;
  isError!: boolean;
  errorMessage!: string;
  orders!: any;

  constructor(private orderService: OrderService) {
    this.isLoaded = true;
    this.isError = false;
    this.errorMessage = 'No Order has been Created yet';
  }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList() {
    this.isLoaded = false;
    this.orderListSubscription = this.orderService.getOrderList().subscribe(
      (response: any) => {
        console.log(response);
        this.orders = response.body!.data!.Orders!.map((Order: any) => {
          return {
            _id: Order._id,
            orderNumber: Order.orderNumber,
            orderDate: Order.orderDate!.split('T')[0]
              .split('-')
              .reverse()
              .join('-'),
            status: Order.status,
            customerName: Order.customerName,
          };
        });
        this.orderListSubscription.unsubscribe();
        this.isLoaded = true;
      },
      (err: any) => {
        console.log(err);
        this.isError = true;
        this.orderListSubscription.unsubscribe();
        this.isLoaded = true;
      }
    );
  }

  createOrder(order: {
    orderNumber: string;
    orderDate: string;
    customerName: string;
    isTaxed: string;
  }) {
    this.createOrderSubscription = this.orderService.createOrder(order).subscribe(
      (response) => {
        console.log(response);
        this.isError = false;
        this.createOrderSubscription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'success',
          title: 'Create Order Success',
          showConfirmButton: true,
          timer: 3000,
        });
      },
      (err) => {
        console.log(err);
        this.createOrderSubscription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'error',
          title: 'Create Order Failed',
          text: err.error.message.split(':')[1].trim(),
          showConfirmButton: true,
          timer: 3000,
        });
      }
    );
  }
}
