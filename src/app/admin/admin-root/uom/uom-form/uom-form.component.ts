import { IProduct } from 'src/app/interfaces/product-interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-uom-form',
  templateUrl: './uom-form.component.html',
  styleUrls: ['./uom-form.component.css'],
})
export class UomFormComponent implements OnInit {
  @Output() createUOM!: EventEmitter<{
    name: string;
    purchasePrice: number;
    sellingPrice: number;
    Product: string;
  }>;
  @Input() products!: IProduct[];
  createUOMForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createUOM = new EventEmitter<{
      name: string;
      purchasePrice: number;
      sellingPrice: number;
      Product: string;
    }>();
  }

  ngOnInit(): void {
    this.initCreateUOMForm();
  }

  initCreateUOMForm() {
    this.createUOMForm = this.fb.group({
      name: [null, [Validators.required]],
      purchasePrice: [null, [Validators.required]],
      sellingPrice: [null, [Validators.required]],
      Product: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.createUOM.emit(this.createUOMForm.value);
  }
}
