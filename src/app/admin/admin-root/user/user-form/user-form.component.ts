import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Output() createUser!: EventEmitter<{
    name: string;
    email: string;
    password: string;
    role: string;
  }>;
  createUserForm!: FormGroup;
  roles!: string[];

  constructor(private fb: FormBuilder) {
    this.roles = ['INVENTORY', 'FINANCE', 'CASHIER'];
    this.createUser = new EventEmitter<{
      name: string;
      email: string;
      password: string;
      role: string;
    }>();
  }

  ngOnInit(): void {
    this.initCreateUserForm();
  }

  initCreateUserForm() {
    this.createUserForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      role: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.createUser.emit(this.createUserForm.value);
  }
}
