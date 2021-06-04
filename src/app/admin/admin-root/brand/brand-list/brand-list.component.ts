import { Component, Input, OnInit } from '@angular/core';
import { IBrand } from 'src/app/interfaces/brand-interface';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  @Input() brands!: IBrand[]

  constructor() { }

  ngOnInit(): void {
  }

}
