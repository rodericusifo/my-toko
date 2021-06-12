import { InvoiceService } from './../../../services/invoice.service';
import { POService } from './../../../services/po.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IPO } from 'src/app/interfaces/PO-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoices!: any;
  POList!: IPO[];
  isLoaded!: boolean;
  isError!: boolean;
  errorMessage!: string;
  POListSubscription!: Subscription;
  invoicesSubscription!: Subscription;
  createInvoiceSubscription!: Subscription;
  editInvoiceStatusSubscription!: Subscription;

  constructor(
    private POService: POService,
    private invoiceService: InvoiceService
  ) {
    this.isLoaded = true;
    this.isError = false;
    this.errorMessage = 'No Invoice has been Created yet';
  }

  ngOnInit(): void {
    this.getPOListAndInvoices();
  }

  getPOListAndInvoices() {
    this.isLoaded = false;
    this.POListSubscription = this.POService.getPOList().subscribe(
      (response) => {
        console.log(response);
        this.POList = response.body!.data!.POList!;
        this.invoicesSubscription = this.invoiceService
          .getInvoiceList()
          .subscribe(
            (response) => {
              console.log(response);
              this.invoices = response.body!.data!.Invoices!.map(
                (Invoice: any) => {
                  return {
                    _id: Invoice._id,
                    PONumber: Invoice.PONumber,
                    INVNumber: Invoice.INVNumber,
                    INVDate: Invoice.INVDate.split('T')[0]
                      .split('-')
                      .reverse()
                      .join('-'),
                    status: Invoice.status,
                  };
                }
              );
              this.POListSubscription.unsubscribe();
              this.invoicesSubscription.unsubscribe();
              this.isLoaded = true;
            },
            (err) => {
              console.log(err);
              this.isError = true;
              this.POListSubscription.unsubscribe();
              this.invoicesSubscription.unsubscribe();
              this.isLoaded = true;
            }
          );
      },
      (err) => {
        console.log(err);
        this.invoicesSubscription = this.invoiceService
          .getInvoiceList()
          .subscribe(
            (response) => {
              console.log(response);
              this.invoices = response.body!.data!.Invoices!.map(
                (Invoice: any) => {
                  return {
                    _id: Invoice._id,
                    PONumber: Invoice.PONumber,
                    INVNumber: Invoice.INVNumber,
                    INVDate: Invoice.INVDate.split('T')[0]
                      .split('-')
                      .reverse()
                      .join('-'),
                    status: Invoice.status,
                  };
                }
              );
              this.POListSubscription.unsubscribe();
              this.invoicesSubscription.unsubscribe();
              this.isLoaded = true;
            },
            (err) => {
              console.log(err);
              this.isError = true;
              this.POListSubscription.unsubscribe();
              this.invoicesSubscription.unsubscribe();
              this.isLoaded = true;
            }
          );
      }
    );
  }

  createInvoice(Invoice: { INVNumber: string; INVDate: string; POID: string }) {
    this.createInvoiceSubscription = this.invoiceService
      .createInvoice(Invoice)
      .subscribe(
        (response) => {
          console.log(response);
          this.isError = false;
          this.createInvoiceSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'success',
            title: 'Create Invoice Success',
            showConfirmButton: true,
            timer: 3000,
          });
        },
        (err) => {
          console.log(err);
          this.createInvoiceSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'error',
            title: 'Create Invoice Failed',
            text: err.error.message.split(':')[1].trim(),
            showConfirmButton: true,
            timer: 3000,
          });
        }
      );
  }

  editInvoiceStatus(Invoice: { invoiceID: string; status: string }) {
    this.editInvoiceStatusSubscription = this.invoiceService
      .editInvoiceStatus(Invoice.invoiceID, Invoice.status)
      .subscribe(
        (response) => {
          console.log(response);
          this.isError = false;
          this.editInvoiceStatusSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'success',
            title: 'Invoice Payment Success',
            showConfirmButton: true,
            timer: 3000,
          });
        },
        (err) => {
          console.log(err);
          this.editInvoiceStatusSubscription.unsubscribe();
          this.ngOnInit();
          Swal.fire({
            icon: 'error',
            title: 'Invoice Payment Failed',
            text: err.error.message.split(':')[1].trim(),
            showConfirmButton: true,
            timer: 3000,
          });
        }
      );
  }
}
