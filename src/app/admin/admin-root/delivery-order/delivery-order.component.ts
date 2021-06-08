import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.css']
})
export class DeliveryOrderComponent implements OnInit {
  isLoaded!: boolean;
  isError!: boolean;
  errorMessage!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
