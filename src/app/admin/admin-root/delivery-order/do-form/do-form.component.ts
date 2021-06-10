import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPOProduct } from 'src/app/interfaces/PO-product-interface';

@Component({
  selector: 'app-do-form',
  templateUrl: './do-form.component.html',
  styleUrls: ['./do-form.component.css'],
})
export class DoFormComponent implements OnInit {
  @Output() createDO!: EventEmitter<{
    DONumber: string;
    DODate: string;
    POProduct: string;
    quantity: number;
  }>;
  @Input() POProducts!: IPOProduct[];
  createDOForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createDO = new EventEmitter<{
      DONumber: string;
      DODate: string;
      POProduct: string;
      quantity: number;
    }>();
  }

  ngOnInit(): void {
    this.initCreateDOForm();
  }

  initCreateDOForm() {
    this.createDOForm = this.fb.group({
      DONumber: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      DODate: [null, [Validators.required]],
      POProduct: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.createDOForm.value.DONumber = `DO${this.createDOForm.value.DONumber}`;
    this.createDO.emit(this.createDOForm.value);
  }
}
