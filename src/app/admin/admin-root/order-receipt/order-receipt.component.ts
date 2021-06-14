import { UOMService } from './../../../services/uom.service';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-receipt',
  templateUrl: './order-receipt.component.html',
  styleUrls: ['./order-receipt.component.css']
})
export class OrderReceiptComponent implements OnInit {
  isLoaded!: boolean;
  UOMActiveList!: any;
  order!: any;
  orderIDDetailSubscription!: Subscription;
  routeParamsSubscription!: Subscription;
  UOMActiveListSubscription!: Subscription;
  addOrderProductSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private UOMService: UOMService,
  ) {
    this.isLoaded = true;
  }

  ngOnInit(): void {
    this.getOrderIDDetailAndUOMActiveList();
  }

  getOrderIDDetailAndUOMActiveList() {
    this.isLoaded = false;
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      this.orderIDDetailSubscription = this.orderService
        .getOrderIDDetail(params.orderID)
        .subscribe(
          (response) => {
            console.log(response);
            response.body!.data!.Order!.orderDate! = response
              .body!.data!.Order!.orderDate!.split('T')[0]
              .split('-')
              .reverse()
              .join('-');
            this.order = response.body!.data!.Order!;
            this.UOMActiveListSubscription =
              this.UOMService.getUOMActiveList().subscribe(
                (response) => {
                  console.log(response);
                  this.UOMActiveList = response.body!.data!.UOMActiveList!;
                  this.routeParamsSubscription.unsubscribe();
                  this.orderIDDetailSubscription.unsubscribe();
                  this.UOMActiveListSubscription.unsubscribe();
                  this.isLoaded = true;
                },
                (err) => {
                  console.log(err);
                  this.routeParamsSubscription.unsubscribe();
                  this.orderIDDetailSubscription.unsubscribe();
                  this.UOMActiveListSubscription.unsubscribe();
                  this.isLoaded = true;
                }
              );
          },
          (err) => {
            console.log(err);
            this.UOMActiveListSubscription =
              this.UOMService.getUOMActiveList().subscribe(
                (response) => {
                  console.log(response);
                  this.UOMActiveList = response.body!.data!.UOMActiveList!;
                  this.routeParamsSubscription.unsubscribe();
                  this.orderIDDetailSubscription.unsubscribe();
                  this.UOMActiveListSubscription.unsubscribe();
                  this.isLoaded = true;
                },
                (err) => {
                  console.log(err);
                  this.routeParamsSubscription.unsubscribe();
                  this.orderIDDetailSubscription.unsubscribe();
                  this.UOMActiveListSubscription.unsubscribe();
                  this.isLoaded = true;
                }
              );
          }
        );
    });
  }
}
