import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './contact.component';
import { LoginGuard } from '../../services/service.index';
import { GridComponent } from '../../components/contact/grid/grid.component';

const contactRoutes: Routes = [
  {
    path: '',
    component: ContactComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'grid', component: GridComponent },
      { path: '', pathMatch: 'full', redirectTo: 'home' }
    ]
  }
];

export const ContactRoutes = RouterModule.forChild(contactRoutes);
