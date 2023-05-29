import { Component, OnInit } from '@angular/core';
import { SocketAlertService } from 'src/app/services/service.index';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  anio: number;
  constructor(public socketAlertService: SocketAlertService) {
    this.anio = new Date().getFullYear();
  }
}
