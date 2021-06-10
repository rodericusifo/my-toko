import { Component, Input, OnInit } from '@angular/core';
import { IDO } from 'src/app/interfaces/DO-interface';

@Component({
  selector: 'app-do-list',
  templateUrl: './do-list.component.html',
  styleUrls: ['./do-list.component.css'],
})
export class DoListComponent implements OnInit {
  @Input() DOList!: IDO[];

  constructor() {}

  ngOnInit(): void {}
}
