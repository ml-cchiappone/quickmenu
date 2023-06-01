import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { GridModel } from '../../../models/grid.model';
import {
  CategoryService,
  RestaurantService,
  RestaurantUserService,
  TableService,
  UserService,
} from '../../../services/service.index';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { UserModel } from '../../../models/user.model';
import { CategoryModel } from '../../../models/category.model';
import { TableModel } from 'src/app/models/table.model';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantUserAbmComponent } from '../dialog/user-abm/restaurant-user-abm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestaurantOrderComponent } from '../dialog/restaurant-order/restaurant-order.component';
import {
  RestaurantModel,
  RestaurantOrders,
} from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class RestaurantHomeComponent implements OnInit {
  snackBar: any;
  categoryCount: number;
  tableCount: number;
  rolAdminEnabled: boolean = false;
  rolRestaurantEnabled: boolean = false;
  categoryList: Array<CategoryModel> = [];
  tableList: Array<TableModel> = [];
  restaurantReceivedOrdersCount: number;
  restaurantReceivedOrdersList: Array<RestaurantOrders> = [];
  user: UserModel;
  restaurantId: string;
  userLocal: UserModel;
  userRestaurantView: boolean = false;
  userRolAdmin: boolean = false;

  constructor(
    private _actRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private categoryService: CategoryService,
    private tableService: TableService,
    private userService: UserService,
    private restaurantUserService: RestaurantUserService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.userLocal = JSON.parse(localStorage.getItem('user'));
    this.checkPermissionView(this.userLocal);
    const restaurantId = this._actRoute.snapshot.params.restaurantId;
    if (restaurantId) {
      this.restaurantId = restaurantId;
      this.getCategoryList();
      this.getTableList();
      this.getOrderListByOrderStatus('received');
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

  openDialogAddUser() {
    const dialogRef = this.dialog.open(RestaurantUserAbmComponent, {
      data: {
        title: 'Añadir nuevo usuario',
        subTitle:
          'Busque y seleccione al usuario que desea agregar al restaurant',
        restaurantId: this.restaurantId,
      },
      disableClose: false,
      position: { top: '100px' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.createRestaurantUser(result);
      return;
    });
  }

  openDialogViewOrder(orderId: number) {
    const dialogRef = this.dialog.open(RestaurantOrderComponent, {
      data: {
        title: 'Pedido',
        orderId,
      },
      disableClose: false,
      position: { top: '100px' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      
      if (!result) {
        this.ngOnInit();
        return;
      }

      return;
    });
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

  getOrderListByOrderStatus(order_status) {
    const limit = 5;
    const offset = 0;

    try {
      this.restaurantService
        .getOrdersByOrderStatus(this.restaurantId, order_status)
        .subscribe(
          (resp: GridModel<RestaurantOrders>) => {
            // @@ TODO: no olvidar manejar cuando venga vacio!
            this.restaurantReceivedOrdersCount = resp.paging.total;
            this.restaurantReceivedOrdersList = resp.results;
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

  createRestaurantUser(user: UserModel) {
    const body = {
      user_id: user.id,
      restaurant_id: this.restaurantId,
    };
    try {
      this.restaurantUserService.create(body).subscribe(
        (resp) => {
          this.callSnackBar(
            `${user.email} fue agregado al restaurant!`,
            2500,
            'notif-success'
          );
        },
        (err) => {
          this.callSnackBar(
            'Hubo un error al agregar el usuario al restaurant!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
  }

  callSnackBar(text: string, duration: number, color: string) {
    this.snackbar.openFromComponent(SnackBarComponent, {
      data: { success: true, message: text },
      duration: duration,
      panelClass: [color],
    });
  }

  // getRestaurantUsersList() {
  //   return this.userService.getUsersByRol('restaurant').pipe(
  //     map((response: GridModel<UserModel>) => {
  //       const restaurantUsersList: Array<UserModel> = response.results;
  //       const filterValues: Array<{ value: string; label: string }> = [];

  //       filterValues.push({
  //         value: '',
  //         label: ' <i class="fas fa-users"></i> Todo',
  //       });
  //       restaurantUsersList.forEach((restaurantUser) => {
  //         filterValues.push({
  //           value: restaurantUser.id.toString(),
  //           label: restaurantUser.email,
  //         });
  //       });

  //       return filterValues;
  //     })
  //   );
  // }
}
