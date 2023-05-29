import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { CategoryAbmComponent } from '../dialog/category-abm/category-abm.component';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { GridModel } from '../../../models/grid.model';
import { UserModel } from '../../../models/user.model';
import { CategoryService } from '../../../services/service.index';
import { CategoryModel } from '../../../models/category.model';

@Component({
  //Al utilizar rooter-outleet no es necesario el selector
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  restaurantId: string;
  page: number = 1;
  angularGrid: AngularGridInstance;
  gridId: string = 'gridCategory';
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
    private _actRoute: ActivatedRoute,
    private router: Router,
    configPagination: NgbPaginationConfig,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private categoryService: CategoryService
  ) {
    configPagination.pageSize = this.limit;
  }

  ngOnInit(): void {
    const restaurantId = this._actRoute.snapshot.parent.params.restaurantId;
    if (restaurantId) {
      this.restaurantId = restaurantId;
    } else {
      this.router.navigate(['/error']);
    }
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
        id: 'description',
        name: 'Descripción',
        field: 'description',
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
        containerId: 'card-body-category',
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
    this.dataset = this.categoryService
      .getList(limit, offset, order, orderBy, name, this.restaurantId)
      .pipe(
        map((response: GridModel<CategoryModel>) => {
          if (!response.results) {
            this.showDataLoad(true, false, false, false, false);
            return;
          }
          const paging = response.paging;
          const categoryList = response.results;

          if (!categoryList || !_.first(categoryList)) {
            this.pagination = 0;
            this.showDataLoad(true, false, false, false, false);
            return [];
          }

          this.pagination = response.results.length;
          this.showDataLoad(false, false, false, false, false);

          return categoryList.map((category) => {
            let row: any = {};
            row.id = category.id;
            row.name = category.name;
            row.description = category.description;
            row.status = category.deleted;

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
        this.goToProducts(dataContext.id);
        break;
      case 'btnEdit':
        this.openDialogCategory('edit', dataContext);
        break;
      case 'btnDelete':
        this.openDialogCategory('delete', dataContext);
        break;
      default:
        break;
    }
    return;
  }

  goToProducts($myParam: string = ''): void {
    this.router.navigate([
      `restaurant/${this.restaurantId}/categories/${$myParam}/products/grid`,
    ]);
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

  openDialogCategory(action: string, dataCategory: Object) {
    let title = '';
    let subTitle = '';
    let secondBtnColor = '';
    let secondBtnText = '';

    switch (action) {
      case 'create':
        title = 'Crear categoria';
        subTitle = 'Complete el formulario para generar una nueva categoria';
        break;
      case 'edit':
        title = 'Editar categoria';
        subTitle = 'Edite los datos de la categoria';
        secondBtnColor = 'warning';
        secondBtnText = 'Editar';
        break;
      case 'delete':
        title = 'Eliminar categoria';
        subTitle = '¿Esta seguro que quiere eliminar la categoria?';
        secondBtnColor = 'danger';
        secondBtnText = 'Eliminar';
        break;
    }

    const dialogRef = this.dialog.open(CategoryAbmComponent, {
      data: {
        title: title,
        subTitle: subTitle,
        secondBtnColor: secondBtnColor,
        secondBtnText: secondBtnText,
        action: action,
        dataForm: dataCategory,
      },
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      switch (result.action) {
        case 'create':
          this.createCategory(result);
          break;
        case 'edit':
          this.editCategory(result);
          break;
        case 'delete':
          this.deleteCategory(result);
          break;
      }
      return;
    });
  }

  createCategory(formData: any) {
    const body = {
      name: formData.name,
      description: formData.description,
      restaurant_id: this.restaurantId,
    };

    Object.entries(body).forEach((element) =>
      element[1] === '' || element[1] === null ? delete body[element[0]] : 0
    );

    try {
      this.categoryService.create(body).subscribe(
        (resp: CategoryModel) => {
          this.callSnackBar(
            'La categoria fue creada correctamente!',
            2500,
            'notif-success'
          );
          this.ngOnInit();
        },
        (err) => {
          this.callSnackBar(
            'Hubo un error al crear la categoria!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
  }

  editCategory(formData: any) {
    const categoryId = formData.categoryId;

    const body = {
      name: formData.name,
      description: formData.description,
    };

    Object.entries(body).forEach((element) =>
      element[1] === '' || element[1] === null ? delete body[element[0]] : 0
    );

    try {
      this.categoryService.update(categoryId, body).subscribe(
        (resp) => {
          this.callSnackBar(
            'La categoria fue editada correctamente!',
            2500,
            'notif-success'
          );
          this.ngOnInit();
        },
        (err) => {
          this.callSnackBar(
            'Hubo un error al editar la categoria!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
  }

  deleteCategory(formData: any) {
    const categoryId = formData.categoryId;
    try {
      this.categoryService.delete(categoryId).subscribe(
        (resp) => {
          this.callSnackBar(
            'La categoria fue eliminada correctamente!',
            2500,
            'notif-success'
          );
          this.ngOnInit();
        },
        (err) => {
          this.callSnackBar(
            'Hubo un error al eliminar la categoria!',
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
