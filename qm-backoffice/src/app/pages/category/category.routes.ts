import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category.component';
import { LoginGuard } from '../../services/service.index';
import { GridComponent } from '../../components/category/grid/grid.component';
import { ProductModule } from '../product/product.module';

const categoryRoutes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    canActivate: [LoginGuard],
    children: [{ path: 'grid', component: GridComponent }],
  },
  {
    path: ':categoryId/products',
    loadChildren: () => ProductModule,
    data: { breadcrumb: 'Productos listar' },
  },
];

export const CategoryRoutes = RouterModule.forChild(categoryRoutes);
