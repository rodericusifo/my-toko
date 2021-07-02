import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthInfoService } from './auth-info.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardRoleService implements CanActivate {
  constructor(
    private authInfoService: AuthInfoService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      this.authInfoService.getDecodedToken() &&
      route.data &&
      route.data.roles &&
      route.data.roles.includes(this.authInfoService.getDecodedToken().role)
    ) {
      return true;
    } else {
      this.router.navigate(['/admin']);
      Swal.fire({
        icon: 'warning',
        title: 'Access Denied',
        text: 'You not allowed to access this page',
        showConfirmButton: true,
        timer: 3000,
      });
      return false;
    }
  }
}
