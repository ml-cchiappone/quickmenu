import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { create } from 'random-seed';

@Injectable({
  providedIn: 'root',
})
export class RecoverPasswordGuard implements CanActivate {
  param1: string;
  private secret: string = 'cafebabe07fb5789acd899123';

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const paramEmail = route.queryParams.email;
    const paramToken = route.queryParams.token;

    if (!paramEmail || !paramToken) {
      this.router.navigate(['/error']);
      return false;
    }

    const seed = this.secret + paramEmail;
    const rand = create(seed);
    const token = rand.string(32);
    const tokenHex = this.convertStringToHex(token)

    if (tokenHex !== paramToken) {
      this.router.navigate(['/error']);
      return false;
    }

    return true;
  }

  convertStringToHex(str: string) {
    var arr = [];
    for (var i = 0; i < str.length; i++) {
           arr[i] = (str.charCodeAt(i).toString(16)).slice(-4);
    }
    return arr.join("");
  }
}
