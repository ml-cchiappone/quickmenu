import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { GridModel } from '../../../models/grid.model';
import { CategoryService, TableService } from '../../../services/service.index';
import { UserModel } from '../../../models/user.model';
import { CategoryModel } from '../../../models/category.model';
import { TableModel } from 'src/app/models/table.model';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class RestaurantHomeComponent implements OnInit {
  categoryCount: number;
  tableCount: number;
  rolAdminEnabled: boolean = false;
  rolRestaurantEnabled: boolean = false;
  categoryList: Array<CategoryModel> = [];
  tableList: Array<TableModel> = [];
  user: UserModel;
  restaurantId: string;
  userLocal: UserModel;
  userRestaurantView: boolean = false;
  userRolAdmin: boolean = false;

  constructor(
    private _actRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.userLocal = JSON.parse(localStorage.getItem('user'));
    this.checkPermissionView(this.userLocal);
    const restaurantId = this._actRoute.snapshot.params.restaurantId;
    if (restaurantId) {
      this.restaurantId = restaurantId;
      this.getCategoryList();
      this.getTableList();
    } else {
      this.router.navigate(['/error']);
    }
  }

  checkPermissionView(userLocal: UserModel) {
    let permissionView: boolean = false;
    const userRolList = userLocal.user_rol;
    userRolList.filter((userRol) => {
      let rolCode = userRol.rol.code;
      switch (rolCode) {
        case 'restaurant':
          this.rolRestaurantEnabled = true;
          permissionView = true;
          break;
        case 'admin':
          permissionView = true;
          this.rolAdminEnabled = true;
          break;
        default:
          break;
      }
    });

    if (permissionView) {
      return;
    }

    this.router.navigate(['/error']);
  }

  goToCategoryView(): void {
    this.router.navigate([`/restaurant/${this.restaurantId}/categories/grid`]);
  }

  goToTableView(): void {
    this.router.navigate([`/restaurant/${this.restaurantId}/tables/grid`]);
  }

  goToProductView(categoryId): void {
    this.router.navigate([
      `/restaurant/${this.restaurantId}/categories/${categoryId}/products/grid`,
    ]);
  }

  getCategoryList() {
    const limit = 5;
    const offset = 0;

    try {
      this.categoryService
        .getList(limit, offset, '', '', '', this.restaurantId)
        .subscribe(
          (resp: GridModel<CategoryModel>) => {
            // @@ TODO: no olvidar manejar cuando venga vacio!
            this.categoryCount = resp.results.length;
            this.categoryList = resp.results;
          },
          (err) => {
            //Mostrar vista de error de carga en el box
            console.log(err);
          }
        );
    } catch {
      console.log('error');
    }
  }

  getTableList() {
    const limit = 5;
    const offset = 0;

    try {
      this.tableService
        .getList(limit, offset, '', '', '', this.restaurantId)
        .subscribe(
          (resp: GridModel<TableModel>) => {
            // @@ TODO: no olvidar manejar cuando venga vacio!
            this.tableCount = resp.results.length;
            this.tableList = resp.results;
          },
          (err) => {
            //Mostrar vista de error de carga en el box
            console.log(err);
          }
        );
    } catch {
      console.log('error');
    }
  }
}
