import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { UserModel } from '../../../../models/user.model';
import { GridModel } from '../../../../models/grid.model';
import { RolService } from '../../../../services/common/rol.service';
import { RolModel } from 'src/app/models/rol.model';

type UserInput = {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  picture: string;
};

@Component({
  selector: 'app-restaurant-user-abm',
  templateUrl: './restaurant-user-abm.component.html',
  styleUrls: ['./restaurant-user-abm.component.css'],
})
export class RestaurantUserAbmComponent implements OnInit {
  title: string = 'Titulo Modal';
  titleColor: string = 'black';
  subTitle: string = 'Subtitulo Modal';
  content: string = 'Contenido del Modal';
  firstBtnColor: string = 'outline-info';
  firstBtnText: string = 'Cancelar';
  secondBtnColor: string = 'success';
  secondBtnText: string = 'Aceptar';
  confirmBtnValue: boolean = true;
  denyBtnValue: Boolean = false;
  projectId: number;
  userList: UserModel[];
  model: UserModel;
  formatter = (result: UserInput) => result.email;
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rolService: RolService
  ) {
    this.title = data.title ? data.title : this.title;
    this.titleColor = data.titleColor ? data.titleColor : this.titleColor;
    this.subTitle = data.subTitle ? data.subTitle : this.subTitle;
    this.content = data.content ? data.content : this.content;
    this.firstBtnColor = data.firstBtnColor
      ? data.firstBtnColor
      : this.firstBtnColor;
    this.firstBtnText = data.firstBtnText
      ? data.firstBtnText
      : this.firstBtnText;
    this.secondBtnColor = data.secondBtnColor
      ? data.secondBtnColor
      : this.secondBtnColor;
    this.secondBtnText = data.secondBtnText
      ? data.secondBtnText
      : this.secondBtnText;
    this.confirmBtnValue = data.confirmBtnValue
      ? data.confirmBtnValue
      : this.confirmBtnValue;
    this.denyBtnValue = data.denyBtnValue
      ? data.denyBtnValue
      : this.denyBtnValue;
    this.projectId = data.projectId;
  }

  ngOnInit(): void {
    this.getListUser();
  }

  getListUser() {
    try {
      this.rolService.getUsersByRol('restaurant').subscribe(
        (resp: RolModel) => {
          let restaurantUsers = resp.users_rol;

          this.userList = restaurantUsers.map((restaurantUser) => {
            return restaurantUser.user;
          });

          return;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch {
      console.log('error');
    }
  }

  validateAlert(input) {
    if (input.invalid && (input.dirty || input.touched)) {
      return true;
    }
    return false;
  }

  validateInput(input) {
    if (input.invalid && (input.dirty || input.touched)) {
      return true;
    }
    if (input.pending) {
      return true;
    }
    return false;
  }

  clearModel() {
    this.model = null;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ''
          ? []
          : this.userList
              .filter(
                (v) => v.email.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 5)
      )
    );
}
