import { RouterModule, Routes } from '@angular/router';

import { TableComponent } from './table.component';
import { LoginGuard } from '../../services/service.index';
import { GridComponent } from '../../components/table/grid/grid.component';

const tableRoutes: Routes = [
  {
    path: '',
    component: TableComponent,
    canActivate: [LoginGuard],
    children: [{ path: 'grid', component: GridComponent }],
  },
];

export const TableRoutes = RouterModule.forChild(tableRoutes);
