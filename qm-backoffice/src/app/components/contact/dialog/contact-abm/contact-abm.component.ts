import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Observable, merge } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter
} from 'rxjs/operators';
import { ProvinceService, ContactInstitutionService } from 'src/app/services/service.index';
import { ProvinceModel } from '../../../../models/province.model';
import { ContactInstitutionModel } from '../../../../models/contact-institution.model';
import { GridModel } from '../../../../models/grid.model';

interface dataForm {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  phone_number: string;
  province: object;
  title: string;
  specialty: string;
  institution: string;
}

@Component({
  selector: 'app-contact-abm',
  templateUrl: './contact-abm.component.html',
  styleUrls: ['./contact-abm.component.css']
})
export class ContactAbmComponent implements OnInit {
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
  institutionList: Array<ContactInstitutionModel>;
  model: ProvinceModel;
  formatterProvince = (result: ProvinceModel) => result.name;
  formatterResult = (result: ProvinceModel) => result.id;
  formatterInstitution = (result: ContactInstitutionModel) => result.description;
  formatterResultInstitution = (result: ContactInstitutionModel) => result.id;
  @ViewChild('instanceProvince', { static: true }) instanceProvince: NgbTypeahead;
  @ViewChild('instanceInstitution', { static: true }) instanceInstitution: NgbTypeahead;
  clickProvince$ = new Subject<string>();
  focusProvince$ = new Subject<string>();
  focusInstitution$ = new Subject<string>();
  clickInstitution$ = new Subject<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder,
    public provinceService: ProvinceService,
    public contactInstitutionService: ContactInstitutionService
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
    this.getInstitutionList();

    if (this.action === 'delete') {
      this.disabledForm = 'true';
    }

    let first_name = '';
    let last_name = '';
    let address = '';
    let email = '';
    let phone_number = '';
    let contactId = null;
    let province = {};
    let title = '';
    let specialty = '';
    let institution = {};

    if (this.dataForm) {
      first_name = this.dataForm.first_name;
      last_name = this.dataForm.last_name;
      address = this.dataForm.address;
      email = this.dataForm.email;
      phone_number = this.dataForm.phone_number;
      contactId = this.dataForm.id;
      province = this.dataForm.province;
      title = this.dataForm.title;
      specialty = this.dataForm.specialty;
      institution = this.dataForm.institution;
    }

    this.formGroup = this.fb.group({
      first_name: [first_name, Validators.required],
      last_name: [last_name, Validators.required],
      email: [email, Validators.required],
      phone_number: [phone_number, Validators.required],
      address: [address, Validators.required],
      province: [province, Validators.required],
      title: [title],
      specialty: [specialty],
      institution: [institution],
      action: this.action,
      contactId: contactId
    });
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
        err => {
          console.log(err);
        }
      );
    } catch {
      console.log('error');
    }
  }

  getInstitutionList() {
    const limit = 200;
    const offset = 0;
    try {
      this.contactInstitutionService.getList(limit, offset, '', false).subscribe(
        (resp: GridModel<ContactInstitutionModel>) => {
          this.institutionList = resp.results;
          return;
        },
        err => {
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
      return 'is-invalid';
    }
    if (input.pending) {
      return 'is-invalid';
    }
    return '';
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
      map(term =>
        (term === ''
          ? this.provinceList
          : this.provinceList.filter(
              v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 5)
      )
    );
  };

  searchInstitution = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickInstitution$.pipe(
      filter(() => !this.instanceInstitution.isPopupOpen())
    );
    const inputFocus$ = this.focusInstitution$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ''
          ? this.institutionList
          : this.institutionList.filter(
              v => v.description.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 5)
      )
    );
  };
}
