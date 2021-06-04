import { IUOM } from 'src/app/interfaces/UOM-interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-uom-list',
  templateUrl: './uom-list.component.html',
  styleUrls: ['./uom-list.component.css'],
})
export class UomListComponent implements OnInit {
  @Input() UOMList!: IUOM[];
  @Output() editUOMStatus!: EventEmitter<{
    UOMID: string;
    status: string;
  }>;

  constructor() {
    this.editUOMStatus = new EventEmitter<{
      UOMID: string;
      status: string;
    }>();
  }

  ngOnInit(): void {}

  activate(UOMID: string) {
    this.editUOMStatus.emit({ UOMID: UOMID, status: 'ACTIVE' });
  }

  deactivate(UOMID: string) {
    this.editUOMStatus.emit({ UOMID: UOMID, status: 'NOT ACTIVE' });
  }
}
