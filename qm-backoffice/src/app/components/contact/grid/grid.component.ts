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
import { ContactService } from 'src/app/services/service.index';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactAbmComponent } from '../dialog/contact-abm/contact-abm.component';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { GridModel } from '../../../models/grid.model';
import { ContactModel } from '../../../models/contact.model';
import { UserModel } from '../../../models/user.model';
import { ProvinceModel } from '../../../models/province.model';

@Component({
  //Al utilizar rooter-outleet no es necesario el selector
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  page: number = 1;
  angularGrid: AngularGridInstance;
  gridId: string = 'gridContact';
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

  constructor(
    private router: Router,
    configPagination: NgbPaginationConfig,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private contactService: ContactService
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
    userRolList.filter(userRol => {
      let rolCode = userRol.rol.code;
      switch (rolCode) {
        case 'contact':
          this.userContactView = true;
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
        id: 'first_name',
        name: 'Nombre',
        field: 'first_name',
        sortable: true,
        filterable: true
      },
      {
        id: 'last_name',
        name: 'Apellido',
        field: 'last_name',
        sortable: true,
        filterable: true
      },
      {
        id: 'title',
        name: 'Título',
        field: 'title',
        sortable: true,
        filterable: true
      },
      {
        id: 'specialty',
        name: 'Especialidad',
        field: 'specialty',
        sortable: true,
        filterable: true
      },
      {
        id: 'institution',
        name: 'Institución',
        field: 'institutionDescription',
        sortable: true,
        filterable: true
      },
      {
        id: 'email',
        name: 'Email',
        field: 'email',
        sortable: true,
        filterable: true
      },
      {
        id: 'phone_number',
        name: 'Teléfono',
        field: 'phone_number',
        sortable: true,
        filterable: false
      },
      {
        id: 'address',
        name: 'Dirección',
        field: 'address',
        sortable: true,
        filterable: true
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
            { value: 'tucuman', label: 'Tucumán' }
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
        id: 'btnEdit',
        name: '',
        field: 'btnEdit',
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
        containerId: 'card-body-contact',
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
    order: string = '',
    orderBy: string = '',
    first_name: string = '',
    last_name: string = '',
    address: string = '',
    email: string = '',
    province: string = '',
    title: string = '',
    specialty: string = '',
    institution: string = ''
  ) {
    if (!province) {
      province = this.provinceFilter;
    }
    if (!first_name) {
      first_name = this.firstNameFilter;
    }
    if (!last_name) {
      last_name = this.lastNameFilter;
    }
    if (!address) {
      address = this.addressFilter;
    }
    if (!email) {
      email = this.emailFilter;
    }
    if (!title) {
      title = this.titleFilter;
    }
    if (!institution) {
      institution = this.institutionFilter;
    }
    if (!specialty) {
      specialty = this.specialtyFilter;
    }

    this.showDataLoad(false, true, true, true, false);
    this.dataset = this.contactService
      .getList(
        limit,
        offset,
        order,
        orderBy,
        first_name,
        last_name,
        address,
        email,
        province,
        title,
        specialty,
        institution
      )
      .pipe(
        map((response: GridModel<ContactModel>) => {
          // @@ TODO: Agregar para validar lodash
          if (!response.results) {
            this.showDataLoad(true, false, false, false, false);
            return;
          }
          const paging = response.paging;
          const contactList = response.results;
          if (!contactList || !_.first(contactList)) {
            this.pagination = 0;
            this.showDataLoad(true, false, false, false, false);
            return [];
          }

          this.pagination = paging.total;
          this.showDataLoad(false, false, false, false, false);

          return contactList.map(contact => {
            let row: any = {};
            row.id = contact.id;
            row.first_name = contact.first_name;
            row.last_name = contact.last_name;
            row.address = contact.address;
            row.email = contact.email;
            row.phone_number = contact.phone_number;
            row.provinceCode = contact.province.code;
            row.province = contact.province;
            row.title = contact.title;
            row.specialty = contact.specialty;
            row.institutionDescription =
              contact.contact_institution &&
              contact.contact_institution.description
                ? contact.contact_institution.description
                : '';
            row.institution = contact.contact_institution
              ? contact.contact_institution
              : {};
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
      this.firstNameFilter,
      this.lastNameFilter,
      this.addressFilter,
      this.emailFilter,
      this.provinceFilter,
      this.titleFilter,
      this.specialtyFilter,
      this.institutionFilter
    );
  }

  toggleCompletedProperty(args: any) {
    const dataContext = args.dataContext;
    const columnDef = args.columnDef;

    switch (columnDef.field) {
      case 'button':
        this.goToAnnotation(dataContext.id);
        break;
      case 'btnEdit':
        this.openDialogContact('edit', dataContext);
        break;
      case 'btnDelete':
        this.openDialogContact('delete', dataContext);
        break;
      default:
        break;
    }
    return;
  }

  goToAnnotation($myParam: string = ''): void {
    this.router.navigate(['/contact/annotation', $myParam]);
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
      this.limit,
      this.order,
      this.orderBy,
      this.firstNameFilter,
      this.lastNameFilter,
      this.addressFilter,
      this.emailFilter,
      this.provinceFilter,
      this.titleFilter,
      this.specialtyFilter,
      this.institutionFilter
    );
  }

  filterBy(gridStateChanges: any) {
    const filters: Array<any> = gridStateChanges.change.newValues;
    this.firstNameFilter = '';
    this.lastNameFilter = '';
    this.addressFilter = '';
    this.emailFilter = '';
    this.provinceFilter = '';
    this.titleFilter = '';
    this.specialtyFilter = '';
    this.institutionFilter = '';

    filters.forEach(filter => {
      switch (filter.columnId) {
        case 'first_name':
          this.firstNameFilter = filter.searchTerms;
          break;
        case 'last_name':
          this.lastNameFilter = filter.searchTerms;
          break;
        case 'address':
          this.addressFilter = filter.searchTerms;
          break;
        case 'email':
          this.emailFilter = filter.searchTerms;
          break;
        case 'provinceCode':
          this.provinceFilter = filter.searchTerms;
          break;
        case 'title':
          this.titleFilter = filter.searchTerms;
          break;
        case 'specialty':
          this.specialtyFilter = filter.searchTerms;
          break;
        case 'institution':
          this.institutionFilter = filter.searchTerms;
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
      this.firstNameFilter,
      this.lastNameFilter,
      this.addressFilter,
      this.emailFilter,
      this.provinceFilter,
      this.titleFilter,
      this.specialtyFilter,
      this.institutionFilter
    );
  }

  openDialogContact(action: string, dataContact: Object) {
    let title = '';
    let subTitle = '';
    let secondBtnColor = '';
    let secondBtnText = '';

    switch (action) {
      case 'create':
        title = 'Crear contacto';
        subTitle = 'Complete el formulario para generar un nuevo contacto';
        break;
      case 'edit':
        title = 'Editar contacto';
        subTitle = 'Edite los datos del contacto';
        secondBtnColor = 'warning';
        secondBtnText = 'Editar';
        break;
      case 'delete':
        title = 'Eliminar contacto';
        subTitle = '¿Esta seguro que quiere eliminar el contacto?';
        secondBtnColor = 'danger';
        secondBtnText = 'Eliminar';
        break;
    }

    const dialogRef = this.dialog.open(ContactAbmComponent, {
      data: {
        title: title,
        subTitle: subTitle,
        secondBtnColor: secondBtnColor,
        secondBtnText: secondBtnText,
        action: action,
        dataForm: dataContact
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      switch (result.action) {
        case 'create':
          this.createContact(result);
          break;
        case 'edit':
          this.editContact(result);
          break;
        case 'delete':
          this.deleteContact(result);
          break;
      }
      return;
    });
  }

  createContact(formData: any) {
    const body = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      address: formData.address,
      province_id: formData.province.id || 1,
      title: formData.title || null,
      specialty: formData.specialty || null,
      contact_institution_id: formData.institution ? formData.institution.id : null
    };

    Object.entries(body).forEach(element =>
      element[1] === '' || element[1] === null ? delete body[element[0]] : 0
    );

    try {
      this.contactService.create(body).subscribe(
        (resp: ContactModel) => {
          this.callSnackBar(
            'El contacto fue creado correctamente!',
            2500,
            'notif-success'
          );
          this.goToAnnotation(resp.id.toString());
        },
        err => {
          this.callSnackBar(
            'Hubo un error al crear el contacto!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
  }

  editContact(formData: any) {
    const contactId = formData.contactId;

    const body = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      address: formData.address,
      province_id: formData.province.id,
      title: formData.title || null,
      specialty: formData.specialty || null,
      contact_institution_id: formData.institution.id || null
    };

    Object.entries(body).forEach(element =>
      element[1] === '' || element[1] === null ? delete body[element[0]] : 0
    );

    try {
      this.contactService.update(contactId, body).subscribe(
        resp => {
          this.callSnackBar(
            'El contacto fue editado correctamente!',
            2500,
            'notif-success'
          );
          this.ngOnInit();
          this.goToAnnotation(contactId.toString());
        },
        err => {
          this.callSnackBar(
            'Hubo un error al editar el contacto!',
            2500,
            'notif-danger'
          );
        }
      );
    } catch {
      console.log('error');
    }
  }

  deleteContact(formData: any) {
    const contactId = formData.contactId;
    try {
      this.contactService.delete(contactId).subscribe(
        (resp: ContactModel) => {
          this.callSnackBar(
            'El contacto fue eliminado correctamente!',
            2500,
            'notif-success'
          );
          this.ngOnInit();
        },
        err => {
          this.callSnackBar(
            'Hubo un error al eliminar el contacto!',
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
      panelClass: [color]
    });
  }
}
