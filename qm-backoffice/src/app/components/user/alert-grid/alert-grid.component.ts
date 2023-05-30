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
  MultipleSelectOption
} from 'angular-slickgrid';
import { PAGINATION_LIMIT } from 'src/app/config/config';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/service.index';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { GridModel } from '../../../models/grid.model';
import { UserModel } from '../../../models/user.model';
import { AlertModel } from 'src/app/models/alert.model';
import * as moment from 'moment-mini';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-alert-grid',
  templateUrl: './alert-grid.component.html',
  styleUrls: ['./alert-grid.component.css']
})
export class AlertGridComponent implements OnInit {
  page: number = 1;
  angularGrid: AngularGridInstance;
  gridId: string = 'gridAlert';
  gridOptions: GridOption;
  dataset: Observable<any>;
  columnDefinitions: Column[];
  limit = PAGINATION_LIMIT;
  offset: number = 0;
  order: string = '';
  orderBy: string = '';
  firstNameFilter: string = '';
  lastNameFilter: string = '';
  addressFilter: string = '';
  emailFilter: string = '';
  provinceFilter: string = '';
  titleFilter: string = '';
  specialtyFilter: string = '';
  institutionFilter: string = '';
  pagination: number;
  snackBar: any;
  userLocal: UserModel;
  userContactView: boolean = false;
  userRolAdmin: boolean = false;
  paginationDisabled: boolean = false;
  showStringEmptyData: boolean = false;
  showStringError: boolean = false;
  showGridSpinner: boolean = false;
  gridOpacity: boolean = false;
  eventFilter: string = '';

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    configPagination: NgbPaginationConfig,
    private dialog: MatDialog,
    private alertService: AlertService) {
      configPagination.pageSize = this.limit;
    }

  ngOnInit(): void {
    this.userLocal = JSON.parse(localStorage.getItem('user'));
    if (!this.userLocal) {
      this.router.navigate(['/error']);
    }
    this.defineGrid();
  }

  defineGrid() {
    this.columnDefinitions = [
      {
        id: 'event',
        name: 'Tipo',
        maxWidth: 150,
        minWidth: 150,  
        field: 'event',
        formatter: this.formatStatusCol,
        filterable: true,
        filter: {
          collection: [
            { value: 'commentary', label: 'Comentario en tarea' },
            { value: 'project_finish', label: 'Proyecto terminado' }
          ],
          model: Filters.multipleSelect,
          filterOptions: {
            autoDropWidth: true,
            okButtonText: 'Filtrar',
            selectAllText: 'Seleccionar todo',
            allSelected: 'todo seleccionado',
            setSelects: (value: 'default') => value
          } as MultipleSelectOption
        }
      },
      {
        id: 'message',
        name: 'Mensaje',
        minWidth: 200,
        field: 'message'
      },
      {
        id: 'emit',
        name: 'Emitido por',
        field: 'emit',
        cssClass: 'text-center',
        formatter: this.formatStatusCol,
        maxWidth: 70,
        minWidth: 70
      },
      {
        id: 'date',
        name: 'Fecha',
        field: 'date',
        formatter: this.formatStatusCol,
        maxWidth: 90,
        minWidth: 90
      },
      {
        id: 'read',
        name: 'Visto',
        field: 'read',
        cssClass: 'text-center',
        maxWidth: 45,
        minWidth: 45,
        formatter: this.formatStatusCol
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
        }
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
        }
      }
    ];

    this.gridOptions = {
      autoHeight: true,
      alwaysShowVerticalScroll: false,
      autoResize: {
        containerId: 'card-body-alert',
        sidePadding: 15
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
        selectActiveRow: false
      }
    };

    this.getData();
  }

  getData(
    offset: number = 0,
    limit: number = this.limit,
    userId: number = this.userLocal.id,
    event: string = null
  ) {
    this.showDataLoad(false, true, true, true, false);
    this.dataset = this.alertService
      .getList(
        limit,
        offset,
        userId,
        event
      )
      .pipe(
        map((response: GridModel<AlertModel>) => {
          // @@ TODO: Agregar para validar lodash
          if (!response.results) {
            this.showDataLoad(true, false, false, false, false);
            return;
          }
          const paging = response.paging;
          const alertList = response.results;

          if (!alertList || !_.first(alertList)) {
            this.pagination = 0;
            this.showDataLoad(true, false, false, false, false);
            return [];
          }
          this.pagination = paging.total;
          this.showDataLoad(false, false, false, false, false);

          return alertList.map(alert => {
            let row: any = {};
            row.id = alert.id;
            row.type = alert.title;
            row.message = alert.message;
            row.event = alert.event;
            row.emit = alert.user_emit;
            row.parentEntityId = alert.parent_entity_id;
            row.entityId = alert.entity_id;
            row.read = alert.read;
            row.date = moment(alert.date_created, 'YYYY-MM-DD HHmmss').subtract(3, 'hours').format('DD/MM/YYYY HH:mm');
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
      this.userLocal.id,
      this.eventFilter
    );
  }

  toggleCompletedProperty(args: any) {
    const dataContext = args.dataContext;
    const columnDef = args.columnDef;

    switch (columnDef.field) {
      case 'button':
        this.updateAlert(dataContext);
        break;
      case 'btnDelete':
        this.openDialogAlert(dataContext);
        break;
      default:
        break;
    }
    return;
  }

  updateAlert(alert: AlertModel) {
    if (alert.read) {
      this.goHandleAlert(alert);
      return;
    }

    let data = {
      read: true
    }

    try {
      this.alertService.update(alert.id, data).subscribe(
          (resp: AlertModel) => {
            if (resp) {
              this.goHandleAlert(resp);
              return;
            }
          },
          (err) => {
            console.log('error');
          }
        );
    } catch {
      console.log('error');
    }
  }

  goHandleAlert(alert: AlertModel) {
    switch (alert.event) {
      case 'project_finish':
        this.goToProjectView(alert, false);
        break;
      case 'commentary':
        this.goToProjectView(alert, true);
        break;
      default:
        break;
    }
  }

  goToProjectView(event: any, openActivity: boolean) {
    let projectId = undefined;
    let activityId = undefined;
    if (openActivity) {
      projectId = event.parent_entity_id ? event.parent_entity_id : event.parentEntityId ;
      activityId = event.entity_id ? event.entity_id : event.entityId;
      this.router.navigate(['/project/activity', projectId, { activityId: activityId }]);
    } else {
      projectId = event.entity_id ? event.entity_id : event.entityId;
      this.router.navigate(['/project/activity', projectId]);
    }
  }

  openDialogAlert(data: any) {
    let alertId = data.id;
    let date =  moment(data.date, 'YYYY-MM-DD HHmmss').subtract(3, 'hours').format('DD/MM/YYYY HH:mm');
    let img = '';
    if (data.emit) {
      img = data.emit.picture ? data.emit.picture : 'assets/img/no_user.jpg';
    } else {
      img = 'assets/img/petition.png';
    }

    let content = `
    <div class="row">
      <div class="col-sm-3 text-center">
        <img alt="Avatar" class="img-dialog" src="${img}">
      </div>
      <div class="col-sm-9">
        <p><strong>Tipo:</strong> ${data.type}</p>
        <p><strong>Mensaje:</strong> ${data.message}</p>
        <p><strong>Fecha:</strong> ${date}</p>
      </div>
    </div>`;

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Eliminar alerta',
        titleColor: 'title-unsubscribe',
        subTitle: '¿Esta seguro que desea eliminar la alerta?',
        secondBtnColor: 'danger',
        content: content,
      },
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.deleteAlert(alertId);
      return;
    });
  }

  deleteAlert(alertId: number) {
    try {
      this.alertService.delete(alertId).subscribe(
        (resp) => {
          this.callSnackBar(
            'La alerta fue eliminada correctamente!',
            2500,
            'notif-success'
          );
          this.defineGrid();
        },
        (err) => {
          this.callSnackBar(
            'Hubo un error al eliminar la tarea!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
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
      case 'event':
        formatCol = `<div>${dataContext.type}</div>`;
        break;
      case 'read':
        let icon = value ? '<i class="far fa-check-square text-green fa-2x"></i>' : '<i class="far fa-square text-muted fa-2x"></i>';
        formatCol = `<div style="${style}">${icon}</div>`;
        break;
      case 'date':
        formatCol = value.replace(' ', '<br>');
        break;
      case 'emit':
        let img = '';
        if (value) {
          img = value.picture ? value.picture : 'assets/img/no_user.jpg';
        } else {
          img = 'assets/img/petition.png';
        }
        formatCol = `<img alt="Avatar" style="border-radius: 50%;display: inline;width: 2.5rem;" src='${img}'>`;
        break;
      case 'button':
        formatCol = `<div style="${style}"><button class="btn btn-success btn-sm" style="line-height: 1; width: 100%;"><i class="fas fa-search"></i></button></div>`;
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

    orders.forEach(order => {
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
      this.limit
    );
  }

  filterBy(gridStateChanges: any) {
    const filters: Array<any> = gridStateChanges.change.newValues;
    this.eventFilter = '';

    filters.forEach(filter => {
      switch (filter.columnId) {
        case 'event':
          this.eventFilter = filter.searchTerms;
          break;
        default:
          break;
      }
    });

    return this.getData(
      this.offset,
      this.limit,
      this.userLocal.id,
      this.eventFilter
    );
  }


  callSnackBar(text: string, duration: number, color: string) {
    this.snackbar.openFromComponent(SnackBarComponent, {
      data: { success: true, message: text },
      duration: duration,
      panelClass: [color]
    });
  }
}
