import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent implements OnInit {
  @Input() invoices!: any;
  @Output() editInvoiceStatus!: EventEmitter<{
    invoiceID: string;
    status: string;
  }>;

  constructor() {
    this.editInvoiceStatus = new EventEmitter<{
      invoiceID: string;
      status: string;
    }>();
  }

  ngOnInit(): void {}

  pay(invoiceID: string) {
    this.editInvoiceStatus.emit({ invoiceID: invoiceID, status: 'PAID' });
  }
}
