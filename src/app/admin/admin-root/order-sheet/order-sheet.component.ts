import { UOMService } from './../../../services/uom.service';
import { OrderService } from './../../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-sheet',
  templateUrl: './order-sheet.component.html',
  styleUrls: ['./order-sheet.component.css'],
})
export class OrderSheetComponent implements OnInit {
  payOrderSubscription!: Subscription;
  cancelOrderSubscription!: Subscription;
  UOMActiveList!: any;
  order!: any;
  orderIDDetailSubscription!: Subscription;
  routeParamsSubscription!: Subscription;
  isLoaded!: boolean;
  UOMActiveListSubscription!: Subscription;
  addOrderProductSubscription!: Subscription;
  cancelOrderForm!: FormGroup;
  search: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private UOMService: UOMService,
    private fb: FormBuilder
  ) {
    this.isLoaded = true;
  }

  ngOnInit(): void {
    this.getOrderIDDetailAndUOMActiveList();
    this.initCancelOrderForm();
  }

  initCancelOrderForm() {
    this.cancelOrderForm = this.fb.group({
      canceledReason: [null, [Validators.required]],
    });
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

  addOrderProduct(orderProduct: { UOM: string; quantity: number }) {
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      this.addOrderProductSubscription = this.orderService
        .addOrderIDProduct(params.orderID, orderProduct)
        .subscribe(
          (response) => {
            console.log(response);
            this.routeParamsSubscription.unsubscribe();
            this.addOrderProductSubscription.unsubscribe();
            this.ngOnInit();
            Swal.fire({
              icon: 'success',
              title: 'Add Product to Order Success',
              showConfirmButton: true,
              timer: 3000,
            });
          },
          (err) => {
            console.log(err);
            this.routeParamsSubscription.unsubscribe();
            this.addOrderProductSubscription.unsubscribe();
            this.ngOnInit();
            Swal.fire({
              icon: 'error',
              title: 'Add Product to Order Failed',
              text: err.error.message.split(':')[1].trim(),
              showConfirmButton: true,
              timer: 3000,
            });
          }
        );
    });
  }

  payOrder() {
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      this.payOrderSubscription = this.orderService
        .editOrderIDStatus(params.orderID, 'PAID')
        .subscribe(
          (response) => {
            console.log(response);
            this.routeParamsSubscription.unsubscribe();
            this.payOrderSubscription.unsubscribe();
            this.ngOnInit();
            Swal.fire({
              icon: 'success',
              title: 'Order Payment Success',
              showConfirmButton: true,
              timer: 3000,
            });
          },
          (err) => {
            console.log(err);
            this.routeParamsSubscription.unsubscribe();
            this.payOrderSubscription.unsubscribe();
            this.ngOnInit();
            Swal.fire({
              icon: 'error',
              title: 'Order Payment Failed',
              text: err.error.message.split(':')[1].trim(),
              showConfirmButton: true,
              timer: 3000,
            });
          }
        );
    });
  }

  cancelOrder() {
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      this.cancelOrderSubscription = this.orderService
        .editOrderIDStatus(params.orderID, 'CANCEL', this.cancelOrderForm.value)
        .subscribe(
          (response) => {
            console.log(response);
            this.routeParamsSubscription.unsubscribe();
            this.cancelOrderSubscription.unsubscribe();
            this.ngOnInit();
            Swal.fire({
              icon: 'success',
              title: 'Cancel Order Success',
              showConfirmButton: true,
              timer: 3000,
            });
          },
          (err) => {
            console.log(err);
            this.routeParamsSubscription.unsubscribe();
            this.cancelOrderSubscription.unsubscribe();
            this.ngOnInit();
            Swal.fire({
              icon: 'error',
              title: 'Cancel Order Failed',
              text: err.error.message.split(':')[1].trim(),
              showConfirmButton: true,
              timer: 3000,
            });
          }
        );
    });
  }
}
