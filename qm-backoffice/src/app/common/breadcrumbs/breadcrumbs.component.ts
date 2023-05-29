import { Component } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent {
  urlBack: string = '';
  breadcrumbs: string = '';
  breadcrumbsChild: string = '';
  breadcrumbChildOne: string = '';
  breadcrumbChildTwo: string = '';
  subs: Array<Subscription> = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.breadcrumbs = this.route.snapshot.data['breadcrumb'];
    this.subs[0] = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route.snapshot),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .subscribe((route: ActivatedRouteSnapshot) => {
        this.urlBack = route.data.urlback;
        this.breadcrumbsChild = route.data.breadcrumbChild;
        this.breadcrumbChildOne = route.data.breadcrumbChildOne;
        this.breadcrumbChildTwo = route.data.breadcrumbChildTwo;
      });
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
