import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  @Output() createOrder!: EventEmitter<{
    orderNumber: string;
    orderDate: string;
    customerName: string;
    isTaxed: string;
  }>;
  createOrderForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createOrder = new EventEmitter<{
      orderNumber: string;
      orderDate: string;
      customerName: string;
      isTaxed: string;
    }>();
  }

  ngOnInit(): void {
    this.initCreatePOForm();
  }

  initCreatePOForm() {
    this.createOrderForm = this.fb.group({
      orderNumber: [
        null,
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      orderDate: [null, [Validators.required]],
      customerName: [null, [Validators.required]],
      isTaxed: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.createOrderForm.value.orderNumber = `ORD${this.createOrderForm.value.orderNumber}`;
    this.createOrder.emit(this.createOrderForm.value);
  }
}
