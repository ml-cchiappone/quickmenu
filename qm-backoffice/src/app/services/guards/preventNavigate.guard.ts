import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../common/user.service';
import * as _ from 'lodash';
import { COMPONENT_ROUTES } from '../../config/componet-routes';

@Injectable({
  providedIn: 'root'
})
export class PreventNavigateGuard implements CanActivate {

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    const childrenRoute = COMPONENT_ROUTES;
    const found = childrenRoute.find( route => url.startsWith(route));
    if (found) {
      this.router.navigate(['/error']);
      return false;
    }
    return true;
  }
}
