import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPO } from 'src/app/interfaces/PO-interface';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent implements OnInit {
  @Output() createInvoice!: EventEmitter<{
    INVNumber: string;
    INVDate: string;
    POID: string;
  }>;
  @Input() POList!: IPO[];
  createInvoiceForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createInvoice = new EventEmitter<{
      INVNumber: string;
      INVDate: string;
      POID: string;
    }>();
  }

  ngOnInit(): void {
    this.initCreateInvoiceForm();
  }

  initCreateInvoiceForm() {
    this.createInvoiceForm = this.fb.group({
      INVNumber: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      INVDate: [null, [Validators.required]],
      POID: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.createInvoiceForm.value.INVNumber = `INV${this.createInvoiceForm.value.INVNumber}`;
    this.createInvoice.emit(this.createInvoiceForm.value);
  }
}
