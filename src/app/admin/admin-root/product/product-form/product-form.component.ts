import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBrand } from 'src/app/interfaces/brand-interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @Output() createProduct!: EventEmitter<{
    name: string;
    code: string;
    Brand: string;
    image: File;
  }>;
  createProductForm!: FormGroup;
  @Input() brands!: IBrand[];

  constructor(private fb: FormBuilder) {
    this.createProduct = new EventEmitter<{
      name: string;
      code: string;
      Brand: string;
      image: File;
    }>();
  }

  ngOnInit(): void {
    this.initCreateProductForm();
  }

  initCreateProductForm() {
    this.createProductForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      Brand: [null, [Validators.required]],
      image: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.createProductForm.value.code = `PRD${this.createProductForm.value.code}`;
    this.createProduct.emit(this.createProductForm.value);
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.createProductForm.patchValue({
      image: file,
    });
    this.createProductForm.get('image')!.updateValueAndValidity();
  }
}
