import { RouterModule, Routes } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';
import { LoginGuard } from '../services/service.index';
import { HomeComponent } from './home/home.component';

// Modules
import { ContactModule } from './contact/contact.module';
import { ProfileModule } from './profile/profile.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { CategoryModule } from './category/category.module';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    // canActivate: [LoginGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: { breadcrumb: 'Inicio' },
      },
      {
        path: 'profile',
        loadChildren: () => ProfileModule,
        data: { breadcrumb: 'Usuario listar' },
      },
      {
        path: 'contact',
        loadChildren: () => ContactModule,
        data: { breadcrumb: 'Contacto listar' },
      },
      {
        path: 'restaurant',
        loadChildren: () => RestaurantModule,
        data: { breadcrumb: 'Restaurant listar' },
      },
      { path: '', pathMatch: 'full', redirectTo: '/home' },
    ],
  },
];

export const PagesRoutes = RouterModule.forChild(pagesRoutes);
