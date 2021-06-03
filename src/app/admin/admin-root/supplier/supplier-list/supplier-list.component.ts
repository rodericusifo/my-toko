import { Component, Input, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/interfaces/supplier-interface';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  @Input() suppliers!: ISupplier[]

  constructor() { }

  ngOnInit(): void {
  }

}
