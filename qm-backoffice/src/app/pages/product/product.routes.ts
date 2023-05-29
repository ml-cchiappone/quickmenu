import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { LoginGuard } from '../../services/service.index';
import { GridComponent } from '../../components/product/grid/grid.component';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'grid', component: GridComponent },
    ],
  },
];

export const ProductRoutes = RouterModule.forChild(productRoutes);
