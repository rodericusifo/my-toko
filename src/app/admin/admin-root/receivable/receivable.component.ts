import { AccountReceivableService } from './../../../services/account-receivable.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-receivable',
  templateUrl: './receivable.component.html',
  styleUrls: ['./receivable.component.css'],
})
export class ReceivableComponent implements OnInit {
  grandTotal!: number;
  ARList!: any;
  isLoaded!: boolean;
  isError!: boolean;
  errorMessage!: string;
  accountReceivableListSubscription!: Subscription;

  constructor(private accountReceivableService: AccountReceivableService) {
    this.isLoaded = true;
    this.isError = false;
    this.errorMessage = 'No Order has been Paid yet';
  }

  ngOnInit(): void {
    this.getAccountReceivableList();
  }

  getAccountReceivableList() {
    this.isLoaded = false;
    this.accountReceivableListSubscription = this.accountReceivableService
      .getAccountReceivableList()
      .subscribe(
        (response: any) => {
          console.log(response);
          this.ARList = response.body!.data!.ARList!.map((AR: any) => {
            return {
              _id: AR._id,
              orderNumber: AR.orderNumber,
              orderDate: AR.orderDate!.split('T')[0]
                .split('-')
                .reverse()
                .join('-'),
              status: AR.status,
              total: AR.total,
            };
          });
          this.grandTotal = this.ARList.reduce((acc: any, cur: any) => {
            return acc + cur.total;
          }, 0);
          this.accountReceivableListSubscription.unsubscribe();
          this.isLoaded = true;
        },
        (err: any) => {
          console.log(err);
          this.isError = true;
          this.accountReceivableListSubscription.unsubscribe();
          this.isLoaded = true;
        }
      );
  }

  exportexcel(): void {
    let element = document.getElementById('receivable-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'account-receivable.xlsx');
  }
}
