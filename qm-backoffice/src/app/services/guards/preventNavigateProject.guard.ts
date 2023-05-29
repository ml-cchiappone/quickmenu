import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../common/user.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PreventNavigateProject implements CanActivate {

  rolAdminEnabled: boolean = false;
  rolProjectEnabled: boolean = false;

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userLocal = localStorage.getItem('user');
    const user = JSON.parse(userLocal);
    const userRoles = user.user_rol;
    
    this.rolAdminEnabled = userRoles.some( userRol => userRol.rol.code === 'admin' );
    this.rolProjectEnabled = userRoles.some( userRol => userRol.rol.code === 'project' );
    
    if (this.rolAdminEnabled || this.rolProjectEnabled) {
      return true;
    }
    this.router.navigate(['/error']);
    return false;
  }
}