import { UOMService } from './../../../services/uom.service';
import { POService } from './../../../services/po.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPO } from 'src/app/interfaces/PO-interface';
import { IUOM } from 'src/app/interfaces/UOM-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-order-sheet',
  templateUrl: './purchase-order-sheet.component.html',
  styleUrls: ['./purchase-order-sheet.component.css'],
})
export class PurchaseOrderSheetComponent implements OnInit {
  isLoaded!: boolean;
  routeParamsSubscription!: Subscription;
  POIDDetailSubscription!: Subscription;
  UOMListSubscription!: Subscription;
  addPOProductSubscription!: Subscription;
  PO!: IPO;
  UOMList!: IUOM[];

  constructor(
    private route: ActivatedRoute,
    private POService: POService,
    private UOMService: UOMService
  ) {
    this.isLoaded = true;
  }

  ngOnInit(): void {
    this.getPOIDDetailAndUOMList();
  }

  getPOIDDetailAndUOMList() {
    this.isLoaded = false;
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      this.POIDDetailSubscription = this.POService.getPOIDDetail(
        params.purchaseOrderID
      ).subscribe(
        (response) => {
          console.log(response);
          response.body!.data!.PO!.PODate! = response
            .body!.data!.PO!.PODate!.split('T')[0]
            .split('-')
            .reverse()
            .join('-');
          this.PO = response.body!.data!.PO!;
          this.UOMListSubscription = this.UOMService.getUOMList().subscribe(
            (response) => {
              console.log(response);
              this.UOMList = response.body!.data!.UOMList!;
              this.routeParamsSubscription.unsubscribe();
              this.POIDDetailSubscription.unsubscribe();
              this.UOMListSubscription.unsubscribe();
              this.isLoaded = true;
            },
            (err) => {
              console.log(err);
              this.routeParamsSubscription.unsubscribe();
              this.POIDDetailSubscription.unsubscribe();
              this.UOMListSubscription.unsubscribe();
              this.isLoaded = true;
            }
          );
        },
        (err) => {
          console.log(err);
          this.UOMListSubscription = this.UOMService.getUOMList().subscribe(
            (response) => {
              console.log(response);
              this.UOMList = response.body!.data!.UOMList!;
              this.routeParamsSubscription.unsubscribe();
              this.POIDDetailSubscription.unsubscribe();
              this.UOMListSubscription.unsubscribe();
              this.isLoaded = true;
            },
            (err) => {
              console.log(err);
              this.routeParamsSubscription.unsubscribe();
              this.POIDDetailSubscription.unsubscribe();
              this.UOMListSubscription.unsubscribe();
              this.isLoaded = true;
            }
          );
        }
      );
    });
  }

  addPOProduct(POProduct: { quantity: number; UOM: string }) {
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      this.addPOProductSubscription = this.POService.addPOIDProduct(
        params.purchaseOrderID,
        POProduct
      ).subscribe(
        (response) => {
          console.log(response);
          this.routeParamsSubscription.unsubscribe();
          this.addPOProductSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'success',
            title: 'Add Product to PO Success',
            showConfirmButton: true,
            timer: 3000,
          });
        },
        (err) => {
          console.log(err);
          this.routeParamsSubscription.unsubscribe();
          this.addPOProductSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'error',
            title: 'Add Product to PO Failed',
            text: err.error.message.split(':')[1].trim(),
            showConfirmButton: true,
            timer: 3000,
          });
        }
      );
    });
  }
}
