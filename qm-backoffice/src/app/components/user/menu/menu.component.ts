import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import {
  UserService,
  RolService,
  UserRolService
} from 'src/app/services/service.index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { RolAbmComponent } from '../dialog/rol-abm/rol-abm.component';
import { GridModel } from '../../../models/grid.model';
import { RolModel } from '../../../models/rol.model';
import * as moment from 'moment-mini';
import {
  NgbDatepickerI18n,
  NgbDateStruct,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import { I18N_VALUES } from '../../../config/datepicker-language';
import { AvailableRoles } from '../../../models/user-rol.model';
import { EMPLOYEE_CATEGORY } from '../../../config/employee-category';

@Injectable()
export class I18n {
  language = 'Arg';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}/${date.month}/${date.year}`;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class MenuComponent implements OnInit {
  user: UserModel;
  userLocal: boolean = false;
  edit: boolean = false;
  form: FormGroup;
  formPassword: FormGroup;
  textPassword: boolean = false;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  imageBase64: string;
  snackBar: any;
  rolAdminEnabled: boolean = false;
  employeeCategoryList = EMPLOYEE_CATEGORY;
  currentYear: any = { year: Number(moment().format('YYYY')), month: 12, day: 31 };

  constructor(
    public router: Router,
    private actRoute: ActivatedRoute,
    public userService: UserService,
    private readonly fb: FormBuilder,
    private snackbar: MatSnackBar,
    public rolService: RolService,
    public userRolService: UserRolService,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cuit: [''],
      birthdate: [''],
      phoneNumber: [''],
      address: [''],
      employeeCategory: [''],
      picture: ['']
    });

    this.formPassword = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let userId = '';
    if (this.actRoute.snapshot.params.id) {
      userId = this.actRoute.snapshot.params.id;
      this.formPassword.disable();
      this.textPassword = true;
    } else {
      const userLocal = localStorage.getItem('user');
      const user = JSON.parse(userLocal);
      this.userLocal = true;
      userId = user.id;
    }
    try {
      this.userService.getUser(userId).subscribe((userData: UserModel) => {
        if (userData) {
          this.user = userData;
          this.validateRol('admin');
        } else {
          this.router.navigate(['/error']);
        }
      });
    } catch {
      console.log('error');
      this.router.navigate(['/error']);
    }
  }

  async validateRol(rol: string) {
    const userLocal = localStorage.getItem('user');
    const _user = JSON.parse(userLocal);

    const availableRoles = _user.user_rol.map(userRol => {
      return AvailableRoles[userRol.rol.code];
    });
    this.rolAdminEnabled = availableRoles.includes(rol);
  }

  submitFormPassword() {
    if (!this.formPassword.valid) {
      this.activeControlForm(this.formPassword);
      return;
    }

    const valuesForm = this.formPassword.getRawValue();
    const inputPassword = this.formPassword.get('password');
    const inputNewPassword = this.formPassword.get('newPassword');
    const inputConfirmPassword = this.formPassword.get('confirmPassword');

    if (valuesForm.password === valuesForm.newPassword) {
      this.callSnackBar(
        'Su nueva contraseña no puede ser igual a la actual!',
        2500,
        'notif-danger'
      );
      inputPassword.markAsPending();
      inputNewPassword.markAsPending();
      return;
    }

    if (valuesForm.newPassword !== valuesForm.confirmPassword) {
      this.callSnackBar(
        'Las contraseñas nuevas no coinciden!',
        2500,
        'notif-danger'
      );
      inputNewPassword.markAsPending();
      inputConfirmPassword.markAsPending();
      return;
    }

    const body = {
      password: valuesForm.password,
      new_password: valuesForm.newPassword
    };

    this.updatePassword(body);
  }

  updatePassword(body: any) {
    try {
      this.userService.updatePassword(this.user.id, body).subscribe(
        resp => {
          this.callSnackBar(
            'Tu contraseña ha sido modificada!',
            2500,
            'notif-success'
          );
        },
        err => {
          if (err.status === 400) {
            this.callSnackBar(
              'La contraseña actual ingresada es incorrecta!',
              2500,
              'notif-danger'
            );
            const inputPassword = this.formPassword.get('password');
            inputPassword.markAsPending();
          }
        }
      );
    } catch {
      console.log('error');
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

  validateAlert(input) {
    if (input.invalid && (input.dirty || input.touched)) {
      return true;
    }
    return false;
  }

  validateInput(input) {
    if (input.invalid && (input.dirty || input.touched)) {
      return 'is-invalid';
    }
    if (input.pending) {
      return 'is-invalid';
    }
    return '';
  }

  activeControlForm(form) {
    const controls = form.controls;

    Object.keys(controls).forEach(key => {
      if (controls[key].status === 'INVALID') {
        controls[key].markAsTouched();
      }
    });
  }

  manageRoles(userRoles) {
    try {
      this.rolService.getList().subscribe(
        (resp: GridModel<RolModel>) => {
          const roles = resp.results;
          const rolesIds = this.getRolesIds(roles);
          const userRolesIds = this.getUserRolesIds(userRoles);
          const userRolDescriptions = this.getUserRolDescriptions(userRoles);

          this.openDialog(roles, userRolesIds, userRolDescriptions, rolesIds);
        },
        err => {
          console.log(err);
          return null;
        }
      );
    } catch {
      console.log('error');
    }
  }

  getUserRolesIds(userRoles) {
    let arrayRolesIds = [];
    userRoles.forEach(element => {
      arrayRolesIds.push(element.rol.id);
    });
    return arrayRolesIds;
  }

  getUserRolDescriptions(userRoles) {
    let arrayUserRolesIds = {};
    userRoles.forEach(element => {
      const userRolId = element.id;
      const description = element.rol.description;
      arrayUserRolesIds[description] = userRolId;
    });
    return arrayUserRolesIds;
  }

  getRolesIds(roles) {
    let rolesId = {};
    roles.forEach(element => {
      const id = element.id;
      const description = element.description;
      rolesId[description] = id;
    });
    return rolesId;
  }

  openDialog(roles, rolesIds, userRolIds, userRolIds2) {
    const dialogRef = this.dialog.open(RolAbmComponent, {
      data: {
        title: 'Editar roles',
        subTitle: `Seleccione los roles del usuario "${this.user.email}"`,
        checkboxList: roles,
        checkboxValues: rolesIds
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      let userRolDelete = [];
      let userRolCreate = [];

      for (const idx in result) {
        if (userRolIds[idx]) {
          if (!result[idx]) {
            const rol = roles.find(rol => rol.description == idx);
            userRolDelete.push({ rol_id: rol.id });
          }
        } else {
          if (result[idx]) {
            userRolCreate.push({
              user_id: this.user.id,
              rol_id: userRolIds2[idx]
            });
          }
        }
      }

      this.createAndDeleteRol(userRolCreate, userRolDelete);
      return;
    });
  }

  createAndDeleteRol(userRolCreate: Array<any>, userRolDelete: Array<any>) {
    const calls = [];

    if (userRolCreate) {
      userRolCreate.forEach(body => {
        calls.push(this.userRolService.create(body));
      });
    }

    if (userRolDelete) {
      userRolDelete.forEach(item => {
        calls.push(this.userRolService.delete(this.user.id, item.rol_id));
      });
    }

    forkJoin(calls).subscribe(
      resp => {
        if (!resp) {
          return;
        }

        if (this.userLocal) {
          this.updateUserLocal();
        }
        this.callSnackBar(
          'Los roles se actualizaron correctamente!',
          2500,
          'notif-success'
        );
        this.ngOnInit();
      },
      err => {
        this.callSnackBar(
          'Hubo un error al actualizar los roles!',
          2500,
          'notif-danger'
        );
      }
    );
  }

  callSnackBar(text: string, duration: number, color: string): void {
    this.snackbar.openFromComponent(SnackBarComponent, {
      data: { success: true, message: text },
      duration: duration,
      panelClass: [color]
    });
  }

  updateUserLocal() {
    try {
      const userLocal = localStorage.getItem('user');
      const _user = JSON.parse(userLocal);
      this.userService.getUser(_user.id).subscribe((userData: UserModel) => {
        localStorage.setItem('user', JSON.stringify(userData));
      });
    } catch {
      this.userService.logout();
    }
  }
}
