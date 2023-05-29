import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: UserModel;
  rolAdminEnabled: boolean = false;
  rolRestaurantEnabled: boolean = false;

  constructor(
    public userService: UserService,
    public router: Router
    ) {
    const userLocal = localStorage.getItem('user');
    if (!userLocal) {
      this.userService.logout();
    }
    try {
      const _user = JSON.parse(userLocal);
      if (!_user) {
        this.userService.logout();
        return;
      }
      this.userService.getUser(_user.id).subscribe((userData: UserModel) => {
        this.user = userData;
        this.validateRol(this.user);
      });
    } catch{
      this.userService.logout();
    }
  }

  ngOnInit() {
  }

  validateRol(user: UserModel) {
    const userRoles = user.user_rol;
    this.rolAdminEnabled = userRoles.some( userRol => userRol.rol.code === 'admin' );
    this.rolRestaurantEnabled = userRoles.some( userRol => userRol.rol.code === 'restaurant' );
  }
}
