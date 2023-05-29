import { RouterModule, Routes } from '@angular/router';

import { RestaurantComponent } from './restaurant.component';
import { LoginGuard } from '../../services/service.index';
import { GridComponent } from '../../components/restaurant/grid/grid.component';
import { RestaurantHomeComponent } from '../../components/restaurant/home/home.component';
import { CategoryModule } from '../category/category.module';
import { TableModule } from '../table/table.module';

const restaurantRoutes: Routes = [
  {
    path: '',
    component: RestaurantComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'grid', component: GridComponent },
      { path: 'home/:restaurantId', component: RestaurantHomeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'grid' },
    ],
  },
  {
    path: ':restaurantId/categories',
    loadChildren: () => CategoryModule,
    data: { breadcrumb: 'Categorias listar' },
  },
  {
    path: ':restaurantId/tables',
    loadChildren: () => TableModule,
    data: { breadcrumb: 'Mesas listar' },
  },
];

export const RestaurantRoutes = RouterModule.forChild(restaurantRoutes);
