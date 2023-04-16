import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from '../../services/menu.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  menu: Observable<Menu[]>;

  constructor( private menuCtrl: MenuController,
    private menuService: MenuService ) { }

ngOnInit() {
this.menu = this.menuService.getMenuOpts();
}

mostrarMenu() {
this.menuCtrl.open('first');
}

}
