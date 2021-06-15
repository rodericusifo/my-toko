import { AccountPayableService } from './../../../services/account-payable.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-payable',
  templateUrl: './payable.component.html',
  styleUrls: ['./payable.component.css'],
})
export class PayableComponent implements OnInit {
  grandTotal!: number;
  APList!: any;
  isLoaded!: boolean;
  isError!: boolean;
  errorMessage!: string;
  accountPayableListSubscription!: Subscription;
  search: any;

  constructor(private accountPayableService: AccountPayableService) {
    this.isLoaded = true;
    this.isError = false;
    this.errorMessage = 'No Invoice has been Paid yet';
  }

  ngOnInit(): void {
    this.getAccountPayableList();
  }

  getAccountPayableList() {
    this.isLoaded = false;
    this.accountPayableListSubscription = this.accountPayableService
      .getAccountPayableList()
      .subscribe(
        (response: any) => {
          console.log(response);
          this.APList = response.body!.data!.APList!.map((AP: any) => {
            return {
              _id: AP._id,
              INVNumber: AP.INVNumber,
              INVDate: AP.INVDate!.split('T')[0].split('-').reverse().join('-'),
              status: AP.status,
              Supplier: {
                name: AP.Supplier.name,
                companyName: AP.Supplier.companyName,
              },
              total: AP.total,
            };
          });
          this.grandTotal = this.APList.reduce((acc: any, cur: any) => {
            return acc + cur.total;
          }, 0);
          this.accountPayableListSubscription.unsubscribe();
          this.isLoaded = true;
        },
        (err: any) => {
          console.log(err);
          this.isError = true;
          this.accountPayableListSubscription.unsubscribe();
          this.isLoaded = true;
        }
      );
  }

  exportexcel(): void {
    let element = document.getElementById('payable-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'account-payable.xlsx');
  }
}
