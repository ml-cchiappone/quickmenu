import { RouterModule, Routes, CanActivate } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { LoginGuard } from '../../services/service.index';
import { MenuComponent } from '../../components/user/menu/menu.component';
import { GridComponent } from '../../components/user/grid/grid.component';
import { PreventNavigateGuard } from '../../services/guards/preventNavigate.guard';
import { PreventNavigateProfile } from '../../services/guards/PreventNavigateProfile.guard';
import { AlertGridComponent } from 'src/app/components/user/alert-grid/alert-grid.component';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [LoginGuard, PreventNavigateGuard],
    children: [
      {
        path: 'grid',
        component: GridComponent,
        canActivate: [PreventNavigateProfile],
      },
      {
        path: 'alert',
        component: AlertGridComponent,
        data: {
          breadcrumbChildOne: 'Alertas',
        },
      },
      {
        path: 'menu',
        component: MenuComponent,
        data: {
          breadcrumbChildOne: 'Menu',
        },
      },
      {
        path: 'menu/:id',
        component: MenuComponent,
        data: {
          urlback: 'grid',
          breadcrumbChild: 'Usuario listar',
          breadcrumbChildTwo: 'Menu',
        },
      },
      { path: '', pathMatch: 'full', redirectTo: '/home' },
    ],
  },
];

export const ProfileRoutes = RouterModule.forChild(profileRoutes);
