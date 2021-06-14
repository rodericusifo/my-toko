import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-sheet-card',
  templateUrl: './order-sheet-card.component.html',
  styleUrls: ['./order-sheet-card.component.css'],
})
export class OrderSheetCardComponent implements OnInit {
  @Input() UOMActive!: any;
  @Output() addOrderProduct!: EventEmitter<{
    UOM: string;
    quantity: number;
  }>;

  constructor() {
    this.addOrderProduct = new EventEmitter<{
      UOM: string;
      quantity: number;
    }>();
  }

  ngOnInit(): void {}

  emitUOM(UOMID: string, quantity: string) {
    this.addOrderProduct.emit({ UOM: UOMID, quantity: Number(quantity) });
  }
}
