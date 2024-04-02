import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FE_APP } from 'src/app/config/config';

interface dataForm {
  id: number;
  description: string;
  restaurant_id?: string;
}

@Component({
  selector: 'app-table-abm',
  templateUrl: './table-abm.component.html',
  styleUrls: ['./table-abm.component.css'],
})
export class TableAbmComponent implements OnInit {
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
  stringQrCode: string = ""

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
    let description = '';
    let tableId = null;
    if (this.action === 'delete') {
      this.disabledForm = 'true';
    }
    if (this.action === 'view') {
      this.generateQR();
    }

    if (this.dataForm) {
      description = this.dataForm.description;
      tableId = this.dataForm.id;

    }

    this.formGroup = this.fb.group({
      description: [description, Validators.required],
      action: this.action,
      tableId: tableId

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

  generateQR(){
    this.stringQrCode = `${FE_APP}/restaurant/${this.dataForm.restaurant_id}?t=${this.dataForm.id}&ref=QR`;    
  }
}
