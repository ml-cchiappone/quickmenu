import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userList: Array<UserModel>;
  userCount: number;
  rolAdminEnabled: boolean = false;
  rolRestaurantEnabled: boolean = false;
  rolEnabled: boolean = false;
  user: UserModel;

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit(): void {
    const userLocal = localStorage.getItem('user');
    this.user = JSON.parse(userLocal);
    this.validateRol(this.user);
  }

  goToProfileGrid(): void {
    this.router.navigate(['/profile/grid']);
  }

  goToUserMenu($myParam: string = ''): void {
    this.router.navigate(['/profile/menu', $myParam]);
  }

  validateRol(user: UserModel) {
    const userRoles = user.user_rol;
    this.rolAdminEnabled = userRoles.some(
      (userRol) => userRol.rol.code === 'admin'
    );
    this.rolRestaurantEnabled = userRoles.some(
      (userRol) => userRol.rol.code === 'restaurant'
    );

    if (!this.rolAdminEnabled && !this.rolRestaurantEnabled) {
      this.rolEnabled = true;
    }
  }
}
