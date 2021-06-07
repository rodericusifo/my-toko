import { IPO } from 'src/app/interfaces/PO-interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.css'],
})
export class PoListComponent implements OnInit {
  @Input() POList!: IPO[];

  constructor() {}

  ngOnInit(): void {}
}
