import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  @Output() createSupplier!: EventEmitter<{
    name: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    discount: number;
  }>;
  createSupplierForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createSupplier = new EventEmitter<{
      name: string;
      companyName: string;
      phoneNumber: string;
      email: string;
      discount: number;
    }>();
  }

  ngOnInit(): void {
    this.initCreateSupplierForm();
  }

  initCreateSupplierForm() {
    this.createSupplierForm = this.fb.group({
      name: [null, [Validators.required ]],
      companyName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required]],
      discount: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.createSupplier.emit(this.createSupplierForm.value);
  }
}
