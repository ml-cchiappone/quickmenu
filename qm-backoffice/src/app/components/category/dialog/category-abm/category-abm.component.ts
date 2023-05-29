import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface dataForm {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-category-abm',
  templateUrl: './category-abm.component.html',
  styleUrls: ['./category-abm.component.css'],
})
export class CategoryAbmComponent implements OnInit {
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder
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
    let name = '';
    let description = '';
    let categoryId = null;
    if (this.action === 'delete') {
      this.disabledForm = 'true';
    }

    if (this.dataForm) {
      name = this.dataForm.name;
      description = this.dataForm.description;
      categoryId = this.dataForm.id;

    }

    this.formGroup = this.fb.group({
      name: [name, Validators.required],
      description: [description, Validators.required],
      action: this.action,
      categoryId: categoryId

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
}
