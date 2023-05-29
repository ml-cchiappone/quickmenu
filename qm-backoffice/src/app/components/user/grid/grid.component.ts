import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularGridInstance,
  Column,
  GridOption,
  Formatter,
  GridStateChange,
} from 'angular-slickgrid';
import { PAGINATION_LIMIT } from 'src/app/config/config';
import { UserService } from 'src/app/services/service.index';
import { Observable } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { UserAbmComponent } from '../dialog/user-abm/user-abm.component';
import { GridModel } from '../../../models/grid.model';
import { UserModel } from '../../../models/user.model';
import * as moment from 'moment-mini';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  page: number = 1;
  angularGrid: AngularGridInstance;
  gridId: string = 'gridUsers';
  gridOptions: GridOption;
  dataset: Observable<any>;
  columnDefinitions: Column[];
  limit = PAGINATION_LIMIT;
  offset: number = 0;
  order: string = '';
  orderBy: string = '';
  email: string = '';
  pagination: number;
  snackBar: any;
  paginationDisabled: boolean = false;
  showStringEmptyData: boolean = false;
  showStringError: boolean = false;
  showGridSpinner: boolean = false;
  gridOpacity: boolean = false;

  constructor(
    private router: Router,
    public userService: UserService,
    configPagination: NgbPaginationConfig,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    configPagination.pageSize = this.limit;
  }

  ngOnInit(): void {
    this.defineGrid();
  }

  defineGrid() {
    this.columnDefinitions = [
      {
        id: 'email',
        name: 'Email',
        field: 'email',
        sortable: true,
        filterable: true,
      },
      {
        id: 'last_connection',
        name: 'Última conexión',
        field: 'last_connection',
        sortable: false,
        formatter: this.formatStatusCol,
        maxWidth: 80,
        minWidth: 80,
      },
      {
        id: 'status',
        name: 'Estado',
        field: 'status',
        sortable: false,
        formatter: this.formatStatusCol,
        maxWidth: 80,
        minWidth: 80,
      },
      {
        id: 'button',
        name: '',
        field: 'button',
        cssClass: 'text-center',
        maxWidth: 45,
        minWidth: 45,
        formatter: this.formatStatusCol,
        onCellClick: (e, args) => {
          this.toggleCompletedProperty(args && args.dataContext);
        },
      },
      {
        id: 'buttonRemove',
        name: '',
        field: 'buttonRemove',
        cssClass: 'text-center',
        maxWidth: 45,
        minWidth: 45,
        formatter: this.formatStatusCol,
        onCellClick: (e, args) => {
          this.openDialog(args && args.dataContext);
        },
      },
    ];

    this.gridOptions = {
      autoHeight: true,
      alwaysShowVerticalScroll: false,
      autoResize: {
        containerId: 'card-body-user',
        sidePadding: 15,
      },
      rowHeight: 50,
      enableFiltering: true,
      enableGridMenu: true,
      enableAutoResize: true,
      enableCellNavigation: true,
      enableCheckboxSelector: false,
      enableRowSelection: false,
      enableEmptyDataWarningMessage: false,
      editable: true,
      rowSelectionOptions: {
        selectActiveRow: false,
      },
    };
    this.getData();
  }

  getData(
    offset = 0,
    limit = this.limit,
    order = '',
    orderBy = '',
    email = ''
  ) {
    if (this.page !== 1) {
      let page = this.page;
      offset = this.limit * (page - 1);
    }

    this.showDataLoad(false, true, true, true, false);
    this.dataset = this.userService
      .getList(limit, offset, order, orderBy, email)
      .pipe(
        map((response: GridModel<UserModel>) => {
          // @@ TODO: Agregar para validar lodash
          if (!response.results) {
            this.showDataLoad(true, false, false, false, false);
            return;
          }
          const paging = response.paging;
          const userList = response.results;

          if (!userList || !_.first(userList)) {
            this.pagination = 0;
            this.showDataLoad(true, false, false, false, false);
            return [];
          }

          this.pagination = paging.total;
          this.showDataLoad(false, false, false, false, false);

          return userList.map((user) => {
            let row: any = {};
            row.id = user.id;
            row.email = user.email;
            row.status = user.deleted;
            row.deleted = user.deleted;
            row.lastConnection = user.last_connection
              ? moment(user.last_connection, 'YYYY-MM-DD HHmmss')
                  .subtract(3, 'hours')
                  .format('DD/MM/YYYY HH:mm:ss')
              : '';
            return row;
          });
        }),
        catchError((err: any) => {
          this.showDataLoad(false, false, false, false, true);
          return [];
        })
      );
  }

  showDataLoad(
    showString: boolean,
    showSpinner: boolean,
    opacity: boolean,
    paginationDisabled: boolean,
    showStringError: boolean
  ): void {
    this.showStringEmptyData = showString;
    this.showGridSpinner = showSpinner;
    this.gridOpacity = opacity;
    this.paginationDisabled = paginationDisabled;
    this.showStringError = showStringError;
    return;
  }

  loadPage(page: number) {
    this.offset = this.limit * (page - 1);
    this.getData(
      this.offset,
      this.limit,
      this.order,
      this.orderBy,
      this.email
    );
  }

  toggleCompletedProperty(item) {
    // toggle property
    if (typeof item === 'object') {
      //item.button = !item.button;
      this.goToUserMenu(item.id);
    }
  }

  goToUserMenu($myParam: string = ''): void {
    this.router.navigate(['/profile/menu', $myParam]);
  }

  // @@ FIXME: move the styles to the css file
  formatStatusCol: Formatter = (
    row: number,
    cell: number,
    value: any,
    columnDef: Column,
    dataContext: any,
    grid: any
  ) => {
    let formatCol = '';
    let style =
      'width:100%; display: flex; justify-content: center; align-items: center; height: 100%;';

    switch (columnDef.field) {
      case 'status':
        const text = value ? 'De Baja' : 'Activo';
        const colorBtn = value ? '#ef8c82' : '#63c563';
        style += `padding: 0 5px; background-color: ${colorBtn};font-weight: bold;color: white;padding: 2px;`;
        formatCol = `<div style="${style}">${text}</div>`;
        break;
      case 'lastConnection':
        formatCol = value.replace(' ', '<br>');
        break;
      case 'button':
        formatCol = `<div style="${style}"><button class="btn btn-success btn-sm" style="line-height: 1; width: 100%;"><i class="fas fa-search"></i></button></div>`;
        break;
      case 'buttonRemove':
        const colorButton = dataContext.deleted ? 'info' : 'danger';
        const icon = dataContext.deleted
          ? '<i class="fas fa-user-plus"></i>'
          : '<i class="fas fa-user-times"></i>';
        formatCol = `<div style="${style}"><button class="btn btn-${colorButton} btn-sm" style="line-height: 1; width: 100%;">${icon}</button></div>`;
        break;
      default:
        break;
    }
    return formatCol;
  };

  gridStateChanged(gridStateChanges: GridStateChange) {
    switch (gridStateChanges.change.type) {
      case 'sorter':
        this.sortBy(gridStateChanges);
        break;
      case 'filter':
        this.filterBy(gridStateChanges);
        break;
      default:
        break;
    }
    return;
  }

  sortBy(gridStateChanges: any) {
    const orders = gridStateChanges.change.newValues;

    this.order = '';
    this.orderBy = '';

    orders.forEach((order) => {
      switch (order.columnId) {
        case 'email':
          this.order = order.direction.toLowerCase();
          this.orderBy = 'email';
          break;
        default:
          break;
      }
    });
    return this.getData(
      this.offset,
      this.limit,
      this.order,
      this.orderBy,
      this.email
    );
  }

  filterBy(gridStateChanges: any) {
    const filters = gridStateChanges.change.newValues;

    this.email = '';

    filters.forEach((filter) => {
      switch (filter.columnId) {
        case 'email':
          this.email = _.first(filter.searchTerms);
          break;
        default:
          break;
      }
    });
    return this.getData(
      this.offset,
      this.limit,
      this.order,
      this.orderBy,
      this.email
    );
  }

  openDialog(userData) {
    let content = `
    <div class="row">
      <div class="col-sm-4 text-center">
        <img alt="Avatar" class="img-dialog" src="${
          userData.picture ? userData.picture : 'assets/img/no_user.jpg'
        }">
      </div>
      <div class="col-sm-8">
        <p><strong>Email:</strong> ${userData.email}</p>
      </div>
    </div>`;

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: userData.deleted ? 'Dar alta de usuario' : 'Dar baja de usuario',
        titleColor: userData.deleted ? 'title-subscribe' : 'title-unsubscribe',
        subTitle: userData.deleted
          ? '¿Esta seguro que quiere dar de alta a este usuario?'
          : '¿Esta seguro que quiere dar de baja a este usuario?',
        secondBtnColor: userData.deleted ? null : 'danger',
        content: content,
      },
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      if (userData.deleted) {
        this.subscribeUser(userData);
      } else {
        this.unsubscribeUser(userData.id);
      }
      return;
    });
  }

  subscribeUser(userData) {
    const userId = userData.id;
    const body = {
      deleted: false,
    };
    try {
      this.userService.subscribe(userId, body).subscribe(
        (resp) => {
          this.callSnackBar(
            'El usuario ha sido dado de alta correctamente!',
            2500,
            'notif-success'
          );
          this.defineGrid();
        },
        (err) => {
          this.callSnackBar(
            'Hubo un error al procesar la solicitud!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
  }

  unsubscribeUser(userId) {
    try {
      this.userService.unsubscribe(userId).subscribe(
        (resp) => {
          this.callSnackBar(
            'El usuario ha sido dado de baja correctamente!',
            2500,
            'notif-success'
          );
          this.defineGrid();
        },
        (err) => {
          this.callSnackBar(
            'Hubo un error al procesar la solicitud!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(UserAbmComponent, {
      data: {
        title: 'Crear usuario',
        subTitle: 'Complete el formulario para dar de alta al nuevo usuario',
      },
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.createUser(result);
      return;
    });
  }

  createUser(dataUser: any) {
    const birthdate = dataUser.birthdate;
    let body = {
      email: dataUser.email,
      password: dataUser.password,
    };

    Object.entries(body).forEach((element) =>
      element[1] === '' || element[1] === null ? delete body[element[0]] : 0
    );

    try {
      this.userService.create(body).subscribe(
        (resp) => {
          this.callSnackBar(
            `Usuario "${dataUser.email}" creado correctamente!`,
            2500,
            'notif-success'
          );
          this.ngOnInit();
        },
        (err) => {
          if (err.status === 400 && err.error.message === 'Duplicate entry.') {
            this.callSnackBar(
              `El usuario "${dataUser.email}" ya existe!`,
              2500,
              'notif-danger'
            );
            return;
          }
          this.callSnackBar(
            'Hubo un error al crear el usuario!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
  }

  callSnackBar(text: string, duration: number, color: string): void {
    this.snackbar.openFromComponent(SnackBarComponent, {
      data: { success: true, message: text },
      duration: duration,
      panelClass: [color],
    });
  }
}
