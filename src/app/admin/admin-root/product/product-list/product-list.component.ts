import { IProduct } from 'src/app/interfaces/product-interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input() products!: IProduct[];
  @Output() editProduct!: EventEmitter<{
    productID: string;
    name: string;
    code: string;
    image: File;
  }>;
  editProductForm!: FormGroup;
  search: any;

  constructor(private fb: FormBuilder) {
    this.editProduct = new EventEmitter<{
      productID: string;
      name: string;
      code: string;
      image: File;
    }>();
  }

  ngOnInit(): void {
    this.initEditProductForm();
  }

  initEditProductForm() {
    this.editProductForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      image: [null],
    });
  }

  onSubmit(productID: string) {
    this.editProductForm.value.productID = productID;
    this.editProductForm.value.code = `PRD${this.editProductForm.value.code}`;
    this.editProduct.emit(this.editProductForm.value);
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.editProductForm.patchValue({
      image: file,
    });
    this.editProductForm.get('image')!.updateValueAndValidity();
  }
}
