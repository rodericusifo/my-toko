import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBrand } from 'src/app/interfaces/brand-interface';
import { BrandService } from 'src/app/services/brand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  isLoaded!: boolean;
  isError!: boolean;
  brands!: IBrand[];
  errorMessage!: string;
  brandListSubscription!: Subscription;
  brandCreateSubscription!: Subscription;

  constructor(private brandService: BrandService) {
    this.isLoaded = true;
    this.isError = false;
    this.errorMessage = 'No Brand has been Created yet';
  }

  ngOnInit(): void {
    this.getBrandList();
  }

  createBrand(brand: { name: string }) {
    this.brandCreateSubscription = this.brandService
      .createBrand(brand)
      .subscribe(
        (response) => {
          console.log(response);
          this.isError = false;
          this.brandCreateSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'success',
            title: 'Create Brand Success',
            showConfirmButton: true,
            timer: 3000,
          });
        },
        (err) => {
          console.log(err);
          this.brandCreateSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'error',
            title: 'Create Brand Failed',
            text: err.error.message.split(':')[1].trim(),
            showConfirmButton: true,
            timer: 3000,
          });
        }
      );
  }

  getBrandList() {
    this.isLoaded = false;
    this.brandListSubscription = this.brandService.getBrandList().subscribe(
      (response) => {
        console.log(response);
        this.brands = response.body!.data!.Brands!.map((Brand) => {
          return {
            _id: Brand._id,
            name: Brand.name,
            createdAt: Brand.createdAt
              .split('T')[0]
              .split('-')
              .reverse()
              .join('-'),
          };
        });
        this.brandListSubscription.unsubscribe();
        this.isLoaded = true;
      },
      (err) => {
        console.log(err);
        this.isError = true;
        this.brandListSubscription.unsubscribe();
        this.isLoaded = true;
      }
    );
  }
}
