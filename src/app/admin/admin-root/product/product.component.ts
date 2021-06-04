import Swal from 'sweetalert2';
import { ProductService } from './../../../services/product.service';
import { BrandService } from './../../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { IBrand } from 'src/app/interfaces/brand-interface';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product-interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  editProductSubscription!: Subscription;
  createProductSubscription!: Subscription;
  productListSubscription!: Subscription;
  brandListSubscription!: Subscription;
  isLoaded!: boolean;
  isError!: boolean;
  errorMessage!: string;
  brands!: IBrand[];
  products!: IProduct[];

  constructor(
    private brandService: BrandService,
    private productService: ProductService
  ) {
    this.isLoaded = true;
    this.isError = false;
    this.errorMessage = 'No Product has been Created yet';
  }

  ngOnInit(): void {
    this.getBrandAndProductList();
  }

  getBrandAndProductList() {
    this.isLoaded = false;
    this.brandListSubscription = this.brandService.getBrandList().subscribe(
      (response) => {
        console.log(response);
        this.brands = response.body!.data!.Brands!;
        this.productListSubscription = this.productService
          .getProductList()
          .subscribe(
            (response) => {
              console.log(response);
              this.products = response.body!.data!.Products!.map((Product) => {
                return {
                  _id: Product._id,
                  name: Product.name,
                  code: Product.code,
                  image: Product.image,
                  Brand: {
                    name: Product.Brand.name,
                  },
                  createdAt: Product.createdAt
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-'),
                };
              });
              this.brandListSubscription.unsubscribe();
              this.productListSubscription.unsubscribe();
              this.isLoaded = true;
            },
            (err) => {
              console.log(err);
              this.isError = true;
              this.brandListSubscription.unsubscribe();
              this.productListSubscription.unsubscribe();
              this.isLoaded = true;
            }
          );
      },
      (err) => {
        console.log(err);
        this.productListSubscription = this.productService
          .getProductList()
          .subscribe(
            (response) => {
              console.log(response);
              this.products = response.body!.data!.Products!.map((Product) => {
                return {
                  _id: Product._id,
                  name: Product.name,
                  code: Product.code,
                  image: Product.image,
                  Brand: {
                    name: Product.name,
                  },
                  createdAt: Product.createdAt
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-'),
                };
              });
              this.brandListSubscription.unsubscribe();
              this.productListSubscription.unsubscribe();
              this.isLoaded = true;
            },
            (err) => {
              console.log(err);
              this.isError = true;
              this.brandListSubscription.unsubscribe();
              this.productListSubscription.unsubscribe();
              this.isLoaded = true;
            }
          );
      }
    );
  }

  createProduct(product: { name: string; code: string; Brand: string }) {
    this.createProductSubscription = this.productService
      .createProduct(product)
      .subscribe(
        (response) => {
          console.log(response);
          this.isError = false;
          this.createProductSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'success',
            title: 'Create Product Success',
            showConfirmButton: true,
            timer: 3000,
          });
        },
        (err) => {
          console.log(err);
          this.createProductSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'error',
            title: 'Create Product Failed',
            text: err.error.message.split(':')[1].trim(),
            showConfirmButton: true,
            timer: 3000,
          });
        }
      );
  }

  editProduct(product: { productID: string; name: string; code: string }) {
    this.editProductSubscription = this.productService
      .editProduct(product.productID, {
        name: product.name,
        code: product.code,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.isError = false;
          this.editProductSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'success',
            title: 'Edit Product Success',
            showConfirmButton: true,
            timer: 3000,
          });
        },
        (err) => {
          console.log(err);
          this.editProductSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'error',
            title: 'Edit Product Failed',
            text: err.error.message.split(':')[1].trim(),
            showConfirmButton: true,
            timer: 3000,
          });
        }
      );
  }
}
