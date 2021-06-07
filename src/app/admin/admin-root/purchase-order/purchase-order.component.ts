import { POService } from './../../../services/po.service';
import { ISupplier } from 'src/app/interfaces/supplier-interface';
import { SupplierService } from 'src/app/services/supplier.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IPO } from 'src/app/interfaces/PO-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
})
export class PurchaseOrderComponent implements OnInit {
  createPOSubscription!: Subscription;
  POList!: IPO[];
  suppliers!: ISupplier[];
  POListSubscription!: Subscription;
  supplierListSubscription!: Subscription;
  isLoaded!: boolean;
  isError!: boolean;
  errorMessage!: string;

  constructor(
    private supplierService: SupplierService,
    private POService: POService
  ) {
    this.isLoaded = true;
    this.isError = false;
    this.errorMessage = 'No Purchase Order has been Created yet';
  }

  ngOnInit(): void {
    this.getSupplierAndPOList();
  }

  getSupplierAndPOList() {
    this.isLoaded = false;
    this.supplierListSubscription = this.supplierService
      .getSupplierList()
      .subscribe(
        (response) => {
          console.log(response);
          this.suppliers = response.body!.data!.Suppliers!;
          this.POListSubscription = this.POService.getPOList().subscribe(
            (response) => {
              console.log(response);
              this.POList = response.body!.data!.POList!.map((PO) => {
                return {
                  _id: PO._id,
                  PONumber: PO.PONumber,
                  PODate: PO.PODate!.split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-'),
                  createdAt: PO.createdAt!.split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-'),
                };
              });
              this.supplierListSubscription.unsubscribe();
              this.POListSubscription.unsubscribe();
              this.isLoaded = true;
            },
            (err) => {
              console.log(err);
              this.isError = true;
              this.supplierListSubscription.unsubscribe();
              this.POListSubscription.unsubscribe();
              this.isLoaded = true;
            }
          );
        },
        (err) => {
          console.log(err);
          this.POListSubscription = this.POService.getPOList().subscribe(
            (response) => {
              console.log(response);
              this.POList = response.body!.data!.POList!.map((PO) => {
                return {
                  _id: PO._id,
                  PONumber: PO.PONumber,
                  PODate: PO.PODate!.split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-'),
                  createdAt: PO.createdAt!.split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-'),
                };
              });
              this.supplierListSubscription.unsubscribe();
              this.POListSubscription.unsubscribe();
              this.isLoaded = true;
            },
            (err) => {
              console.log(err);
              this.isError = true;
              this.supplierListSubscription.unsubscribe();
              this.POListSubscription.unsubscribe();
              this.isLoaded = true;
            }
          );
        }
      );
  }

  createPO(PO: {
    PONumber: string;
    PODate: string;
    shipTo: {
      name: string;
      companyName: string;
      email: string;
      phoneNumber: string;
    };
    Supplier: string;
  }) {
    this.createPOSubscription = this.POService.createPO(PO).subscribe(
      (response) => {
        console.log(response);
        this.isError = false;
        this.createPOSubscription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'success',
          title: 'Create Purchase Order Success',
          showConfirmButton: true,
          timer: 3000,
        });
      },
      (err) => {
        console.log(err);
        this.createPOSubscription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'error',
          title: 'Create Purchase Order Failed',
          text: err.error.message.split(':')[1].trim(),
          showConfirmButton: true,
          timer: 3000,
        });
      }
    );
  }
}
