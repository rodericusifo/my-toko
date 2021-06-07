import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUOM } from 'src/app/interfaces/UOM-interface';

@Component({
  selector: 'app-po-sheet-form',
  templateUrl: './po-sheet-form.component.html',
  styleUrls: ['./po-sheet-form.component.css'],
})
export class PoSheetFormComponent implements OnInit {
  @Output() addPOProduct!: EventEmitter<{
    quantity: number;
    UOM: string;
  }>;
  @Input() UOMList!: IUOM[];
  addPOProductForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addPOProduct = new EventEmitter<{
      quantity: number;
      UOM: string;
    }>();
  }

  ngOnInit(): void {
    this.initAddPOProductForm();
  }

  initAddPOProductForm() {
    this.addPOProductForm = this.fb.group({
      quantity: [null, [Validators.required]],
      UOM: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.addPOProduct.emit(this.addPOProductForm.value);
  }
}
