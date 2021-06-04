import Swal from 'sweetalert2';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/user-interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  isLoaded!: boolean;
  isError!: boolean;
  users!: IUser[];
  errorMessage!: string;
  userListSubscription!: Subscription;
  userCreateSubscription!: Subscription;

  constructor(private userService: UserService) {
    this.isLoaded = true;
    this.isError = false;
    this.errorMessage = 'No User has been Created yet';
  }

  ngOnInit(): void {
    this.getUserList();
  }

  createUser(user: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) {
    this.userCreateSubscription = this.userService.createUser(user).subscribe(
      (response) => {
        console.log(response);
        this.isError = false;
        this.userCreateSubscription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'success',
          title: 'Create User Success',
          showConfirmButton: true,
          timer: 3000,
        });
      },
      (err) => {
        console.log(err);
        this.userCreateSubscription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'error',
          title: 'Create User Failed',
          text: err.error.message.split(':')[1].trim(),
          showConfirmButton: true,
          timer: 3000,
        });
      }
    );
  }

  getUserList() {
    this.isLoaded = false;
    this.userListSubscription = this.userService.getUserList().subscribe(
      (response) => {
        console.log(response);
        this.users = response.body!.data!.Users!;
        this.userListSubscription.unsubscribe();
        this.isLoaded = true;
      },
      (err) => {
        console.log(err);
        this.isError = true;
        this.userListSubscription.unsubscribe();
        this.isLoaded = true;
      }
    );
  }
}
