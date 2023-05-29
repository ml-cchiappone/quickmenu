import { RouterModule, Routes, CanActivate } from '@angular/router';

import { Error404Component } from './common/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { RecoverFormComponent } from './pages/recover-form/recover-form.component';
import { RecoverPasswordGuard } from './services/guards/recover-password.guard';

const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "recover", component: RecoverComponent },
  { path: "recover/password", component: RecoverFormComponent, canActivate: [RecoverPasswordGuard] },
  { path: "**", component: Error404Component }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes);
