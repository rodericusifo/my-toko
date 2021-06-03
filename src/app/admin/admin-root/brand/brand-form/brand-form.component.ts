import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {
  @Output() createBrand!: EventEmitter<{
    name: string;
  }>;
  createBrandForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createBrand = new EventEmitter<{
      name: string;
    }>();
  }

  ngOnInit(): void {
    this.initCreateBrandForm();
  }

  initCreateBrandForm() {
    this.createBrandForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.createBrand.emit(this.createBrandForm.value);
  }
}
