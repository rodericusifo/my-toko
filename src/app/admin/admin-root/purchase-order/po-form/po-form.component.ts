import { ISupplier } from 'src/app/interfaces/supplier-interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-po-form',
  templateUrl: './po-form.component.html',
  styleUrls: ['./po-form.component.css'],
})
export class PoFormComponent implements OnInit {
  @Output() createPO!: EventEmitter<{
    PONumber: string;
    PODate: string;
    shipTo: {
      name: string;
      companyName: string;
      email: string;
      phoneNumber: string;
    };
    Supplier: string;
  }>;
  @Input() suppliers!: ISupplier[];
  createPOForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createPO = new EventEmitter<{
      PONumber: string;
      PODate: string;
      shipTo: {
        name: string;
        companyName: string;
        email: string;
        phoneNumber: string;
      };
      Supplier: string;
    }>();
  }

  ngOnInit(): void {
    this.initCreatePOForm();
  }

  initCreatePOForm() {
    this.createPOForm = this.fb.group({
      PONumber: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      PODate: [null, [Validators.required]],
      shipTo: this.fb.group({
        name: [null, [Validators.required]],
        companyName: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        phoneNumber: [null, [Validators.required]],
      }),
      Supplier: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.createPOForm.value.PONumber = `PO${this.createPOForm.value.PONumber}`;
    this.createPO.emit(this.createPOForm.value);
  }
}
