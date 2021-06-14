import Swal from 'sweetalert2';
import { UOMService } from './../../../services/uom.service';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product-interface';
import { IUOM } from 'src/app/interfaces/UOM-interface';

@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.css'],
})
export class UomComponent implements OnInit {
  editUOMStatusSubscription!: Subscription;
  createUOMSubscription!: Subscription;
  productListSubscription!: Subscription;
  UOMListSubscription!: Subscription;
  isLoaded!: boolean;
  isError!: boolean;
  errorMessage!: string;
  UOMList!: IUOM[];
  products!: IProduct[];

  constructor(
    private productService: ProductService,
    private UOMService: UOMService
  ) {
    this.isLoaded = true;
    this.isError = false;
    this.errorMessage = 'No Unit of Measure has been Created yet';
  }

  ngOnInit(): void {
    this.getProductAndUOMList();
  }

  getProductAndUOMList() {
    this.isLoaded = false;
    this.productListSubscription = this.productService
      .getProductList()
      .subscribe(
        (response) => {
          console.log(response);
          this.products = response.body!.data!.Products!;
          this.UOMListSubscription = this.UOMService.getUOMList().subscribe(
            (response) => {
              console.log(response);
              this.UOMList = response.body!.data!.UOMList!.map((UOM) => {
                return {
                  _id: UOM._id,
                  name: UOM.name,
                  purchasePrice: UOM.purchasePrice,
                  sellingPrice: UOM.sellingPrice,
                  stock: UOM.stock,
                  status: UOM.status,
                  Product: {
                    name: UOM.Product.name,
                    code: UOM.Product.code,
                    image: UOM.Product.image,
                    Brand: {
                      name: UOM.Product.Brand.name,
                    },
                  },
                  createdAt: UOM.createdAt
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-'),
                };
              });
              this.productListSubscription.unsubscribe();
              this.UOMListSubscription.unsubscribe();
              this.isLoaded = true;
            },
            (err) => {
              console.log(err);
              this.isError = true;
              this.productListSubscription.unsubscribe();
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
              this.UOMList = response.body!.data!.UOMList!.map((UOM) => {
                return {
                  _id: UOM._id,
                  name: UOM.name,
                  purchasePrice: UOM.purchasePrice,
                  sellingPrice: UOM.sellingPrice,
                  stock: UOM.stock,
                  status: UOM.status,
                  Product: {
                    name: UOM.Product.name,
                    code: UOM.Product.code,
                    image: UOM.Product.image,
                    Brand: {
                      name: UOM.Product.Brand.name,
                    },
                  },
                  createdAt: UOM.createdAt
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-'),
                };
              });
              this.productListSubscription.unsubscribe();
              this.UOMListSubscription.unsubscribe();
              this.isLoaded = true;
            },
            (err) => {
              console.log(err);
              this.isError = true;
              this.productListSubscription.unsubscribe();
              this.UOMListSubscription.unsubscribe();
              this.isLoaded = true;
            }
          );
        }
      );
  }

  createUOM(UOM: {
    name: string;
    purchasePrice: number;
    sellingPrice: number;
    Product: string;
  }) {
    this.createUOMSubscription = this.UOMService.createUOM(UOM).subscribe(
      (response) => {
        console.log(response);
        this.isError = false;
        this.createUOMSubscription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'success',
          title: 'Create Unit of Measure Success',
          showConfirmButton: true,
          timer: 3000,
        });
      },
      (err) => {
        console.log(err);
        this.createUOMSubscription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'error',
          title: 'Create Unit of Measure Failed',
          text: err.error.message.split(':')[1].trim(),
          showConfirmButton: true,
          timer: 3000,
        });
      }
    );
  }

  editUOMStatus(UOM: { UOMID: string; status: string }) {
    this.editUOMStatusSubscription = this.UOMService.editUOMStatus(
      UOM.UOMID,
      UOM.status
    ).subscribe(
      (response) => {
        console.log(response);
        this.isError = false;
        this.editUOMStatusSubscription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'success',
          title: 'Edit Unit of Measure Status Success',
          showConfirmButton: true,
          timer: 3000,
        });
      },
      (err) => {
        console.log(err);
        this.editUOMStatusSubscription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'error',
          title: 'Edit Unit of Measure Status Failed',
          text: err.error.message.split(':')[1].trim(),
          showConfirmButton: true,
          timer: 3000,
        });
      }
    );
  }

  runOutStock() {
    this.UOMList = this.UOMList.filter((UOM) => {
      return UOM.stock <= 10;
    });
  }
}
