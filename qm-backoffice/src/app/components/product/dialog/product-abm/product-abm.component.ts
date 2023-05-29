import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../../../services/common/category.service';
import { CategoryModel } from 'src/app/models/category.model';
import { Observable, Subject, merge } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

interface dataForm {
  id: number;
  name: string;
  description: string;
  price: string;
  restaurant_id: string;
  category: object;
}

@Component({
  selector: 'app-product-abm',
  templateUrl: './product-abm.component.html',
  styleUrls: ['./product-abm.component.css'],
})
export class ProductAbmComponent implements OnInit {
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
  restaurantId: string;
  categoryList: Array<CategoryModel>;
  @ViewChild('instanceCategory', { static: true })
  instanceCategory: NgbTypeahead;
  clickCategory$ = new Subject<string>();
  focusCategory$ = new Subject<string>();
  formatterCategory = (result: CategoryModel) => result.name;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder,
    public categoryService: CategoryService
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
    this.restaurantId = this?.dataForm?.restaurant_id;
    this.getCategoryList();    

    let name = '';
    let description = '';
    let price = '';
    let productId = null;
    let restaurantId = null;
    let category = {};
    if (this.action === 'delete') {
      this.disabledForm = 'true';
    }

    if (this.dataForm) {
      name = this.dataForm.name;
      description = this.dataForm.description;
      price = this.dataForm.price;
      productId = this.dataForm.id;
      category = this.dataForm.category;
    }

    this.formGroup = this.fb.group({
      name: [name, Validators.required],
      description: [description, Validators.required],
      price: [price, Validators.required],
      category: [category, Validators.required],
      action: this.action,
      productId: productId,
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

  getCategoryList() {
    const limit = 30;
    const offset = 0;
    try {
      this.categoryService
        .getList(limit, offset, '', '', '', this.restaurantId)
        .subscribe(
          (resp) => {
            this.categoryList = resp.results;

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

  searchCategory = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickCategory$.pipe(
      filter(() => !this.instanceCategory.isPopupOpen())
    );
    const inputFocus$ = this.focusCategory$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ''
          ? this.categoryList
          : this.categoryList.filter(
              (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 5)
      )
    );
  };
}
