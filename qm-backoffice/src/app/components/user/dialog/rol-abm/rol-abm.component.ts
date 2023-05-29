import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-rol-abm',
  templateUrl: './rol-abm.component.html',
  styleUrls: ['./rol-abm.component.css']
})
export class RolAbmComponent implements OnInit {
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


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title ? data.title : this.title;
    this.titleColor = data.titleColor ? data.titleColor : this.titleColor;
    this.subTitle = data.subTitle ? data.subTitle : this.subTitle;
    this.content = data.content ? data.content : this.content;
    this.firstBtnColor = data.firstBtnColor ? data.firstBtnColor : this.firstBtnColor;
    this.firstBtnText = data.firstBtnText ? data.firstBtnText : this.firstBtnText;
    this.secondBtnColor = data.secondBtnColor ? data.secondBtnColor : this.secondBtnColor;
    this.secondBtnText = data.secondBtnText ? data.secondBtnText : this.secondBtnText;
    this.confirmBtnValue = data.confirmBtnValue ? data.confirmBtnValue : this.confirmBtnValue;
    this.denyBtnValue = data.denyBtnValue ? data.denyBtnValue : this.denyBtnValue;

    let group={};
    if (data.checkboxList) {
        data.checkboxList.forEach(element => {
            group[element.description] = new FormControl( (data.checkboxValues.indexOf(element.id) !== -1 ? true : false ) , Validators.requiredTrue);
        });
    }
    this.formGroup = new FormGroup(group);
  }

  ngOnInit(): void {
  }
}
