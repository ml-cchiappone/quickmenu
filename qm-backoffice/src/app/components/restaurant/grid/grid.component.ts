import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  AngularGridInstance,
  Column,
  GridOption,
  Formatter,
  Filters,
  GridStateChange,
  MultipleSelectOption,
} from 'angular-slickgrid';
import { PAGINATION_LIMIT } from '../../../config/config';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestaurantAbmComponent } from '../dialog/restaurant-abm/restaurant-abm.component';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { GridModel } from '../../../models/grid.model';
import { UserModel } from '../../../models/user.model';
import { ProvinceModel } from '../../../models/province.model';
import { RestaurantService } from '../../../services/service.index';
import { RestaurantModel } from '../../../models/restaurant.model';

@Component({
  //Al utilizar rooter-outleet no es necesario el selector
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  page: number = 1;
  angularGrid: AngularGridInstance;
  gridId: string = 'gridRestaurant';
  gridOptions: GridOption;
  dataset: Observable<any>;
  columnDefinitions: Column[];
  limit = PAGINATION_LIMIT;
  offset: number = 0;
  order: string = '';
  orderBy: string = '';
  nameFilter: string = '';
  pagination: number;
  snackBar: any;
  userLocal: UserModel;
  userRestaurantView: boolean = false;
  userRolAdmin: boolean = false;
  paginationDisabled: boolean = false;
  showStringEmptyData: boolean = false;
  showStringError: boolean = false;
  showGridSpinner: boolean = false;
  gridOpacity: boolean = false;

  constructor(
    private router: Router,
    configPagination: NgbPaginationConfig,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private restaurantService: RestaurantService
  ) {
    configPagination.pageSize = this.limit;
  }

  ngOnInit(): void {
    this.userLocal = JSON.parse(localStorage.getItem('user'));
    this.checkPermissionView(this.userLocal);
    this.defineGrid();
  }

  checkPermissionView(userLocal: UserModel) {
    let permissionView: boolean = false;
    const userRolList = userLocal.user_rol;
    userRolList.filter((userRol) => {
      let rolCode = userRol.rol.code;
      switch (rolCode) {
        case 'restaurant':
          this.userRestaurantView = true;
          permissionView = true;
          break;
        case 'admin':
          permissionView = true;
          this.userRolAdmin = true;
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

  defineGrid() {
    this.columnDefinitions = [
      {
        id: 'name',
        name: 'Nombre',
        field: 'name',
        sortable: true,
        filterable: true,
      },
      {
        id: 'address',
        name: 'Dirección',
        field: 'address',
        sortable: true,
        filterable: true,
      },
      {
        id: 'phone_number',
        name: 'Número de teléfono',
        field: 'phone_number',
        sortable: true,
        filterable: true,
      },
      {
        id: 'provinceCode',
        name: 'Provincia',
        field: 'provinceCode',
        filterable: true,
        formatter: this.formatStatusCol,
        maxWidth: 130,
        filter: {
          collection: [
            { value: 'mendoza', label: 'Mendoza' },
            { value: 'buenos_aires', label: 'Buenos Aires' },
            { value: 'catamarca', label: 'Catamarca' },
            { value: 'chaco', label: 'Chaco' },
            { value: 'chubut', label: 'Chubut' },
            { value: 'cordoba', label: 'Córdoba' },
            { value: 'corrientes', label: 'Corrientes' },
            { value: 'entre_rios', label: 'Entre Ríos' },
            { value: 'formosa', label: 'Formosa' },
            { value: 'jujuy', label: 'Jujuy' },
            { value: 'la_pampa', label: 'La Pampa' },
            { value: 'la_rioja', label: 'La Rioja' },
            { value: 'misiones', label: 'Misiones' },
            { value: 'neuquen', label: 'Neuquén' },
            { value: 'rio_negro', label: 'Río Negro' },
            { value: 'salta', label: 'Salta' },
            { value: 'san_juan', label: 'San Juan' },
            { value: 'san_luis', label: 'San Luis' },
            { value: 'santa_cruz', label: 'Santa Cruz' },
            { value: 'santa_fe', label: 'Santa Fe' },
            { value: 'tierra_del_fuego', label: 'Tierra del Fuego' },
            { value: 'santa_del_estero', label: 'Santiago del Estero' },
            { value: 'tucuman', label: 'Tucumán' },
          ],
          model: Filters.multipleSelect,
          filterOptions: {
            autoDropWidth: true,
            okButtonText: 'Filtrar',
            selectAllText: 'Seleccionar todo',
            allSelected: 'todo seleccionado',
            setSelects: (value: 'default') => value,
          } as MultipleSelectOption,
        },
      },
      {
        id: 'lat',
        name: 'Latitud',
        field: 'lat',
        sortable: true,
        filterable: true,
      },
      {
        id: 'lon',
        name: 'Longitud',
        field: 'lon',
        sortable: true,
        filterable: true,
      },
      {
        id: 'currency_symbol',
        name: 'Moneda',
        field: 'currency_symbol',
        sortable: true,
        filterable: true,
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
          this.toggleCompletedProperty(args);
        },
      },
      {
        id: 'btnEdit',
        name: '',
        field: 'btnEdit',
        cssClass: 'text-center',
        maxWidth: 45,
        minWidth: 45,
        formatter: this.formatStatusCol,
        onCellClick: (e, args) => {
          this.toggleCompletedProperty(args);
        },
      },
      {
        id: 'btnDelete',
        name: '',
        field: 'btnDelete',
        cssClass: 'text-center',
        maxWidth: 45,
        minWidth: 45,
        formatter: this.formatStatusCol,
        onCellClick: (e, args) => {
          this.toggleCompletedProperty(args);
        },
      },
    ];

    this.gridOptions = {
      autoHeight: true,
      alwaysShowVerticalScroll: false,
      autoResize: {
        containerId: 'card-body-restaurant',
        sidePadding: 15,
      },
      rowHeight: 50,
      enableFiltering: true,
      enableGridMenu: true,
      enableAutoResize: true,
      enableCellNavigation: true,
      enableCheckboxSelector: false,
      enableRowSelection: false,
      editable: true,
      enableEmptyDataWarningMessage: false,
      rowSelectionOptions: {
        selectActiveRow: false,
      },
    };

    this.getData();
  }

  getData(
    offset: number = 0,
    limit: number = this.limit,
    order: string = '',
    orderBy: string = '',
    name: string = ''
  ) {
    if (!name) {
      name = this.nameFilter;
    }

    this.showDataLoad(false, true, true, true, false);
    this.dataset = this.restaurantService
      .getList(limit, offset, order, orderBy, name)
      .pipe(
        map((response: GridModel<RestaurantModel>) => {
          // @@ TODO: Agregar para validar lodash
          if (!response.results) {
            this.showDataLoad(true, false, false, false, false);
            return;
          }
          const paging = response.paging;
          const restaurantList = response.results;

          if (!restaurantList || !_.first(restaurantList)) {
            this.pagination = 0;
            this.showDataLoad(true, false, false, false, false);
            return [];
          }

          this.pagination = paging.total;
          this.showDataLoad(false, false, false, false, false);

          return restaurantList.map((restaurant) => {
            let row: any = {};
            row.id = restaurant.id;
            row.name = restaurant.name;
            row.string_id = restaurant.string_id;
            row.address = restaurant.address;
            row.phone_number = restaurant.phone_number;
            row.lat = restaurant.lat;
            row.lon = restaurant.lon;
            row.currency_symbol = restaurant.currency_symbol;
            row.status = restaurant.deleted;
            row.provinceCode = restaurant.province.code;
            row.province = restaurant.province;

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
      this.nameFilter
    );
  }

  toggleCompletedProperty(args: any) {
    const dataContext = args.dataContext;
    const columnDef = args.columnDef;

    switch (columnDef.field) {
      case 'button':
        this.goToRestaurant(dataContext.string_id);
        break;
      case 'btnEdit':
        this.openDialogRestaurant('edit', dataContext);
        break;
      case 'btnDelete':
        this.openDialogRestaurant('delete', dataContext);
        break;
      default:
        break;
    }
    return;
  }

  goToRestaurant($myParam: string = ''): void {
    this.router.navigate(['/restaurant/home', $myParam]);
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
      case 'provinceCode':
        const province: ProvinceModel = dataContext.province;
        formatCol = `<div>${province.name}</div>`;
        break;
      case 'status':
        const text = value ? 'De Baja' : 'Activo';
        const colorBtn = value ? '#ef8c82' : '#63c563';
        style += `padding: 0 5px; background-color: ${colorBtn};font-weight: bold;color: white;padding: 2px;`;
        formatCol = `<div style="${style}">${text}</div>`;
        break;
      case 'button':
        formatCol = `<div style="${style}"><button class="btn btn-success btn-sm" style="line-height: 1; width: 100%;"><i class="fas fa-search"></i></button></div>`;
        break;
      case 'btnEdit':
        formatCol = `<div style="${style}"><button class="btn btn-warning btn-sm" style="line-height: 1; width: 100%;"><i class="far fa-edit"></i></button></div>`;
        break;
      case 'btnDelete':
        formatCol = `<div style="${style}"><button class="btn btn-danger btn-sm" style="line-height: 1; width: 100%;"><i class="far fa-trash-alt"></i></button></div>`;
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

    //this.order = '';

    orders.forEach((order) => {
      switch (order.columnId) {
        /*case 'firstName':
          this.order = order.direction.toLowerCase();
          this.orderBy = 'first_name';
          break;*/
        default:
          break;
      }
    });
    return this.getData(
      this.offset,
      this.limit,
      this.order,
      this.orderBy,
      this.nameFilter
    );
  }

  filterBy(gridStateChanges: any) {
    const filters: Array<any> = gridStateChanges.change.newValues;
    this.nameFilter = '';

    filters.forEach((filter) => {
      switch (filter.columnId) {
        case 'name':
          this.nameFilter = filter.searchTerms;
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
      this.nameFilter
    );
  }

  openDialogRestaurant(action: string, dataRestaurant: Object) {
    let title = '';
    let subTitle = '';
    let secondBtnColor = '';
    let secondBtnText = '';

    switch (action) {
      case 'create':
        title = 'Crear restaurant';
        subTitle = 'Complete el formulario para generar un nuevo restaurant';
        break;
      case 'edit':
        title = 'Editar restaurant';
        subTitle = 'Edite los datos del restaurant';
        secondBtnColor = 'warning';
        secondBtnText = 'Editar';
        break;
      case 'delete':
        title = 'Eliminar restaurant';
        subTitle = '¿Esta seguro que quiere eliminar el restaurant?';
        secondBtnColor = 'danger';
        secondBtnText = 'Eliminar';
        break;
    }

    const dialogRef = this.dialog.open(RestaurantAbmComponent, {
      data: {
        title: title,
        subTitle: subTitle,
        secondBtnColor: secondBtnColor,
        secondBtnText: secondBtnText,
        action: action,
        dataForm: dataRestaurant,
      },
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((formData) => {
      if (!formData) {
        return;
      }

      switch (formData.action) {
        case 'create':
          this.createRestaurant(formData);
          break;
        case 'edit':
          this.editRestaurant(formData);
          break;
        case 'delete':
          this.deleteRestaurant(formData);
          break;
      }
      return;
    });
  }

  createRestaurant(formData: any) {
    const body = {
      name: formData.name,
      phone_number: formData.phone_number,
      address: formData.address,
      province_id: formData.province.id,
      currency_symbol: formData.currency_symbol,
      user_id: this.userLocal.id
    };

    Object.entries(body).forEach((element) =>
      element[1] === '' || element[1] === null ? delete body[element[0]] : 0
    );

    try {
      this.restaurantService.create(body).subscribe(
        (resp: RestaurantModel) => {
          this.callSnackBar(
            'El restaurant fue creado correctamente!',
            2500,
            'notif-success'
          );
          this.ngOnInit();

        },
        (err) => {
          this.callSnackBar(
            'Hubo un error al crear el restaurant!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
  }

  editRestaurant(formData: any) {
    const restaurantId = formData.restaurantId;

    const body = {
      name: formData.name,
      phone_number: formData.phone_number,
      address: formData.address,
      province_id: formData.province.id,
      currency_symbol: formData.currency_symbol,
    };

    Object.entries(body).forEach((element) =>
      element[1] === '' || element[1] === null ? delete body[element[0]] : 0
    );

    try {
      this.restaurantService.update(restaurantId, body).subscribe(
        (resp) => {
          this.callSnackBar(
            'El restaurant fue editado correctamente!',
            2500,
            'notif-success'
          );
          this.ngOnInit();
        },
        (err) => {
          this.callSnackBar(
            'Hubo un error al editar el restaurant!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
  }

  deleteRestaurant(formData: any) {
    const restaurantId = formData.restaurantId;
    try {
      this.restaurantService.delete(restaurantId).subscribe(
        (resp: RestaurantModel) => {
          this.callSnackBar(
            'El restaurant fue eliminado correctamente!',
            2500,
            'notif-success'
          );
          this.ngOnInit();
        },
        (err) => {
          this.callSnackBar(
            'Hubo un error al eliminar el restaurant!',
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
}
