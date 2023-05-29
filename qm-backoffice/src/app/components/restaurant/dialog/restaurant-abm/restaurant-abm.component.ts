import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Observable, merge } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { ProvinceModel } from 'src/app/models/province.model';
import { ProvinceService } from '../../../../services/common/province.service';
import { GridModel } from 'src/app/models/grid.model';

interface dataForm {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  province: object;
  currency_symbol: string;
}

@Component({
  selector: 'app-restaurant-abm',
  templateUrl: './restaurant-abm.component.html',
  styleUrls: ['./restaurant-abm.component.css'],
})
export class RestaurantAbmComponent implements OnInit {
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
  formGroup: FormGroup;
  action: String;
  errorDate: Boolean = false;
  dataForm: dataForm;
  disabledForm: any = undefined;
  provinceList: Array<ProvinceModel>;
  @ViewChild('instanceProvince', { static: true })
  instanceProvince: NgbTypeahead;
  clickProvince$ = new Subject<string>();
  focusProvince$ = new Subject<string>();
  focusInstitution$ = new Subject<string>();
  clickInstitution$ = new Subject<string>();
  formatterProvince = (result: ProvinceModel) => result.name;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder,
    public provinceService: ProvinceService
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
    this.action = data.action;
    this.dataForm = data.dataForm;
  }

  ngOnInit(): void {
    this.getProvinceList();

    if (this.action === 'delete') {
      this.disabledForm = 'true';
    }

    let name = '';
    let address = '';
    let phone_number = '';
    let currency_symbol = '';
    let province = {};
    let restaurantId = null;

    if (this.dataForm) {
      name = this.dataForm.name;
      address = this.dataForm.address;
      phone_number = this.dataForm.phone_number;
      restaurantId = this.dataForm.id;
      province = this.dataForm.province;
      currency_symbol = this.dataForm.currency_symbol;
    }

    this.formGroup = this.fb.group({
      name: [name, Validators.required],
      phone_number: [phone_number, Validators.required],
      address: [address, Validators.required],
      province: [province, Validators.required],
      currency_symbol: [currency_symbol, Validators.required],
      action: this.action,
      restaurantId: restaurantId,
    });
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

  getProvinceList() {
    const limit = 30;
    const offset = 0;
    try {
      this.provinceService.getList(limit, offset).subscribe(
        (resp: GridModel<ProvinceModel>) => {
          this.provinceList = resp.results;
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

  searchProvince = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickProvince$.pipe(
      filter(() => !this.instanceProvince.isPopupOpen())
    );
    const inputFocus$ = this.focusProvince$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ''
          ? this.provinceList
          : this.provinceList.filter(
              (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 5)
      )
    );
  };
}
