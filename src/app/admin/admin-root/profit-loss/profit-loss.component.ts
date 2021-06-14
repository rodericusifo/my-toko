import { EStatementService } from './../../../services/e-statement.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.css'],
})
export class ProfitLossComponent implements OnInit {
  EStatementList!: any;
  incomesTotal!: number;
  expensesTotal!: number;
  profitLoss!: number;
  isLoaded!: boolean;
  isError!: boolean;
  errorMessage!: string;
  EStatementDetailSubscription!: Subscription;

  constructor(private EStatementService: EStatementService) {
    this.isLoaded = true;
    this.isError = false;
    this.errorMessage = 'No Invoice or Order has been Paid yet';
  }

  ngOnInit(): void {
    this.getEStatementDetail();
  }

  getEStatementDetail() {
    this.isLoaded = false;
    this.EStatementDetailSubscription =
      this.EStatementService.getEStatementDetail().subscribe(
        (response: any) => {
          console.log(response);
          const incomes = response.body!.data!.Incomes!.map((Income: any) => {
            return {
              _id: Income._id,
              number: Income.orderNumber,
              date: Income.orderDate!.split('T')[0]
                .split('-')
                .reverse()
                .join('-'),
              total: Income.total,
            };
          });
          this.incomesTotal = incomes.reduce((acc: any, cur: any) => {
            return acc + cur.total;
          }, 0);
          const expenses = response.body!.data!.Expenses!.map(
            (Expense: any) => {
              return {
                _id: Expense._id,
                number: Expense.INVNumber,
                date: Expense.INVDate!.split('T')[0]
                  .split('-')
                  .reverse()
                  .join('-'),
                total: Expense.total,
              };
            }
          );
          this.expensesTotal = expenses.reduce((acc: any, cur: any) => {
            return acc + cur.total;
          }, 0);
          this.EStatementList = [...expenses, ...incomes].sort(
            (a: any, b: any) => {
              let dateA: any = new Date(a.date);
              let dateB: any = new Date(b.date);
              return dateA - dateB;
            }
          );
          this.profitLoss = this.incomesTotal - this.expensesTotal;
          this.EStatementDetailSubscription.unsubscribe();
          this.isLoaded = true;
        },
        (err: any) => {
          console.log(err);
          this.isError = true;
          this.EStatementDetailSubscription.unsubscribe();
          this.isLoaded = true;
        }
      );
  }
}
