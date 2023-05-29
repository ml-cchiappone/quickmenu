import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// @@ TODO: Donde va any debe ir esta interface, falta terminar de armar
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
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
  }

  ngOnInit(): void {
  }
}
