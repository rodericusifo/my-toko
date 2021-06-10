import { DOService } from './../../../services/do.service';
import { POService } from './../../../services/po.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IPOProduct } from 'src/app/interfaces/PO-product-interface';
import { IDO } from 'src/app/interfaces/DO-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.css'],
})
export class DeliveryOrderComponent implements OnInit {
  isLoaded!: boolean;
  isError!: boolean;
  errorMessage!: string;
  POProductListSubscription!: Subscription;
  DOListSubscription!: Subscription;
  createDOSubscription!: Subscription;
  POProducts!: IPOProduct[];
  DOList!: IDO[];

  constructor(private POService: POService, private DOService: DOService) {
    this.isLoaded = true;
    this.isError = false;
    this.errorMessage = 'No Delivery Order has been Created yet';
  }

  ngOnInit(): void {
    this.getPOProductAndDOList();
  }

  getPOProductAndDOList() {
    this.isLoaded = false;
    this.POProductListSubscription =
      this.POService.getPOProductList().subscribe(
        (response) => {
          console.log(response);
          this.POProducts = response.body!.data!.POProductList!;
          this.DOListSubscription = this.DOService.getDOList().subscribe(
            (response) => {
              console.log(response);
              this.DOList = response.body!.data!.DOList!.map((DO) => {
                return {
                  quantity: DO.quantity,
                  _id: DO._id,
                  DONumber: DO.DONumber,
                  DODate: DO.DODate.split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-'),
                  POProduct: {
                    _id: DO.POProduct._id,
                    UOM: {
                      _id: DO.POProduct.UOM._id,
                      name: DO.POProduct.UOM.name,
                      Product: {
                        _id: DO.POProduct.UOM.Product._id,
                        name: DO.POProduct.UOM.Product.name,
                      },
                    },
                    PO: {
                      _id: DO.POProduct.PO!._id,
                      PONumber: DO.POProduct.PO!.PONumber,
                    },
                  },
                  createdAt: DO.createdAt
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-'),
                };
              });
              this.POProductListSubscription.unsubscribe();
              this.DOListSubscription.unsubscribe();
              this.isLoaded = true;
            },
            (err) => {
              console.log(err);
              this.isError = true;
              this.POProductListSubscription.unsubscribe();
              this.DOListSubscription.unsubscribe();
              this.isLoaded = true;
            }
          );
        },
        (err) => {
          console.log(err);
          this.DOListSubscription = this.DOService.getDOList().subscribe(
            (response) => {
              console.log(response);
              this.DOList = response.body!.data!.DOList!.map((DO) => {
                return {
                  quantity: DO.quantity,
                  _id: DO._id,
                  DONumber: DO.DONumber,
                  DODate: DO.DODate.split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-'),
                  POProduct: {
                    _id: DO.POProduct._id,
                    UOM: {
                      _id: DO.POProduct.UOM._id,
                      name: DO.POProduct.UOM.name,
                      Product: {
                        _id: DO.POProduct.UOM.Product._id,
                        name: DO.POProduct.UOM.Product.name,
                      },
                    },
                    PO: {
                      _id: DO.POProduct.PO!._id,
                      PONumber: DO.POProduct.PO!.PONumber,
                    },
                  },
                  createdAt: DO.createdAt
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-'),
                };
              });
              this.POProductListSubscription.unsubscribe();
              this.DOListSubscription.unsubscribe();
              this.isLoaded = true;
            },
            (err) => {
              console.log(err);
              this.isError = true;
              this.POProductListSubscription.unsubscribe();
              this.DOListSubscription.unsubscribe();
              this.isLoaded = true;
            }
          );
        }
      );
  }

  createDO(DO: {
    DONumber: string;
    DODate: string;
    POProduct: string;
    quantity: number;
  }) {
    this.createDOSubscription = this.DOService.createDO(DO).subscribe(
      (response) => {
        console.log(response);
        this.isError = false;
        this.createDOSubscription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'success',
          title: 'Create Delivery Order Success',
          showConfirmButton: true,
          timer: 3000,
        });
      },
      (err) => {
        console.log(err);
        this.createDOSubscription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'error',
          title: 'Create Delivery Order Failed',
          text: err.error.message.split(':')[1].trim(),
          showConfirmButton: true,
          timer: 3000,
        });
      }
    );
  }
}
