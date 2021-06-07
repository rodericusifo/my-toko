import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISupplier } from 'src/app/interfaces/supplier-interface';
import { SupplierService } from 'src/app/services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit {
  isLoaded!: boolean;
  isError!: boolean;
  suppliers!: ISupplier[];
  errorMessage!: string;
  supplierListSubscription!: Subscription;
  supplierCreateSubscription!: Subscription;

  constructor(private supplierService: SupplierService) {
    this.isLoaded = true;
    this.isError = false;
    this.errorMessage = 'No Supplier has been Created yet';
  }

  ngOnInit(): void {
    this.getSupplierList();
  }

  createSupplier(supplier: {
    name: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    discount: number;
  }) {
    this.supplierCreateSubscription = this.supplierService
      .createSupplier(supplier)
      .subscribe(
        (response) => {
          console.log(response);
          this.isError = false;
          this.supplierCreateSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'success',
            title: 'Create Supplier Success',
            showConfirmButton: true,
            timer: 3000,
          });
        },
        (err) => {
          console.log(err);
          this.supplierCreateSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'error',
            title: 'Create Supplier Failed',
            text: err.error.message.split(':')[1].trim(),
            showConfirmButton: true,
            timer: 3000,
          });
        }
      );
  }

  getSupplierList() {
    this.isLoaded = false;
    this.supplierListSubscription = this.supplierService
      .getSupplierList()
      .subscribe(
        (response) => {
          console.log(response);
          this.suppliers = response.body!.data!.Suppliers!.map((Supplier) => {
            return {
              _id: Supplier._id,
              name: Supplier.name,
              companyName: Supplier.companyName,
              phoneNumber: Supplier.phoneNumber,
              email: Supplier.email,
              discount: Supplier.discount,
              createdAt: Supplier.createdAt!.split('T')[0]
                .split('-')
                .reverse()
                .join('-'),
            };
          });
          this.supplierListSubscription.unsubscribe();
          this.isLoaded = true;
        },
        (err) => {
          console.log(err);
          this.isError = true;
          this.supplierListSubscription.unsubscribe();
          this.isLoaded = true;
        }
      );
  }
}
