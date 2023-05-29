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
import { ProductAbmComponent } from '../dialog/product-abm/product-abm.component';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { GridModel } from '../../../models/grid.model';
import { UserModel } from '../../../models/user.model';
import { ProductService } from '../../../services/service.index';
import { ProductModel } from '../../../models/product.model';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  //Al utilizar rooter-outleet no es necesario el selector
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  restaurantId: string;
  categoryId: number;
  page: number = 1;
  angularGrid: AngularGridInstance;
  gridId: string = 'gridProduct';
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
    private productService: ProductService
  ) {
    configPagination.pageSize = this.limit;
  }

  ngOnInit(): void {
    this.userLocal = JSON.parse(localStorage.getItem('user'));
    this.checkPermissionView(this.userLocal);

    const restaurantId = this._actRoute.snapshot.parent.params.restaurantId;
    const categoryId = this._actRoute.snapshot.parent.params.categoryId;

    if (restaurantId && categoryId) {
      this.restaurantId = restaurantId;
      this.categoryId = categoryId;
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
        id: 'price',
        name: 'Precio',
        field: 'price',
        sortable: true,
        filterable: true,
      },
      {
        id: 'categoryName',
        name: 'Categoria',
        field: 'categoryName',
        formatter: this.formatStatusCol,
        sortable: true,
        filterable: false,
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
        containerId: 'card-body-product',
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
    this.dataset = this.productService
      .getList(
        limit,
        offset,
        order,
        orderBy,
        name,
        this.restaurantId,
        this.categoryId
      )
      .pipe(
        map((response: GridModel<ProductModel>) => {
          if (!response.results) {
            this.showDataLoad(true, false, false, false, false);
            return;
          }
          const paging = response.paging;
          const productList = response.results;

          if (!productList || !_.first(productList)) {
            this.pagination = 0;
            this.showDataLoad(true, false, false, false, false);
            return [];
          }

          this.pagination = response.results.length;
          this.showDataLoad(false, false, false, false, false);

          return productList.map((product) => {
            let row: any = {};
            row.id = product.id;
            row.name = product.name;
            row.description = product.description;
            row.price = product.price;
            row.thumbnail = product.thumbnail;
            row.status = product.deleted;
            row.category = product.categories;
            row.category_id = product.category_id;
            row.restaurant_id = this.restaurantId;

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
        this.goToCategory(dataContext.id);
        break;
      case 'btnEdit':
        this.openDialogProduct('edit', dataContext);
        break;
      case 'btnDelete':
        this.openDialogProduct('delete', dataContext);
        break;
      default:
        break;
    }
    return;
  }

  goToCategory($myParam: string = ''): void {
    this.router.navigate(['/restaurant/annotation', $myParam]);
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
      case 'categoryName':
        const category: CategoryModel = dataContext.category;
        formatCol = `<div>${category.name}</div>`;
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

  openDialogProduct(action: string, dataProduct: Object) {
    let title = '';
    let subTitle = '';
    let secondBtnColor = '';
    let secondBtnText = '';

    switch (action) {
      case 'create':
        title = 'Crear producto';
        subTitle = 'Complete el formulario para generar un nuevo producto';
        break;
      case 'edit':
        title = 'Editar producto';
        subTitle = 'Edite los datos del producto';
        secondBtnColor = 'warning';
        secondBtnText = 'Editar';
        break;
      case 'delete':
        title = 'Eliminar producto';
        subTitle = '¿Esta seguro que quiere eliminar el producto?';
        secondBtnColor = 'danger';
        secondBtnText = 'Eliminar';
        break;
    }

    const dialogRef = this.dialog.open(ProductAbmComponent, {
      data: {
        title: title,
        subTitle: subTitle,
        secondBtnColor: secondBtnColor,
        secondBtnText: secondBtnText,
        action: action,
        dataForm: dataProduct || {
          restaurant_id: this.restaurantId,
        },
      },
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      switch (result.action) {
        case 'create':
          this.createProduct(result);
          break;
        case 'edit':
          this.editProduct(result);
          break;
        case 'delete':
          this.deleteProduct(result);
          break;
      }
      return;
    });
  }

  createProduct(formData: any) {
    const body = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category_id: this.categoryId,
      restaurant_id: this.restaurantId,
    };

    Object.entries(body).forEach((element) =>
      element[1] === '' || element[1] === null ? delete body[element[0]] : 0
    );

    try {
      this.productService.create(body).subscribe(
        (resp: ProductModel) => {
          this.callSnackBar(
            'El producto fue creado correctamente!',
            2500,
            'notif-success'
          );
          this.ngOnInit();
        },
        (err) => {
          this.callSnackBar(
            'Hubo un error al crear el producto!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
  }

  editProduct(formData: any) {
    const productId = formData.productId;

    const body = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category_id: formData.category.id,
    };

    Object.entries(body).forEach((element) =>
      element[1] === '' || element[1] === null ? delete body[element[0]] : 0
    );
    try {
      this.productService
        .update(this.restaurantId, this.categoryId, productId, body)
        .subscribe(
          (resp) => {
            this.callSnackBar(
              'El producto fue editado correctamente!',
              2500,
              'notif-success'
            );
            this.ngOnInit();
          },
          (err) => {
            this.callSnackBar(
              'Hubo un error al editar el producto!',
              2500,
              'notif-danger'
            );
          }
        );
    } catch {
      console.log('error');
    }
  }

  deleteProduct(formData: any) {
    const productId = formData.productId;
    try {
      this.productService
        .delete(this.restaurantId, this.categoryId, productId)
        .subscribe(
          (resp) => {
            this.callSnackBar(
              'El producto fue eliminado correctamente!',
              2500,
              'notif-success'
            );
            this.ngOnInit();
          },
          (err) => {
            this.callSnackBar(
              'Hubo un error al eliminar el producto!',
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
