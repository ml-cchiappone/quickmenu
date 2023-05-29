import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../common/user.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (!this.userService.isLogged() || !this.userService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
