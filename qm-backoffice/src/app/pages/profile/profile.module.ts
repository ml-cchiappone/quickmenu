// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { NgxMaskModule } from 'ngx-mask';

//Routes
import { ProfileRoutes } from './profile.routes';

// Components
import { ProfileComponent } from './profile.component';
import { MenuComponent } from '../../components/user/menu/menu.component';
import { GridComponent } from 'src/app/components/user/grid/grid.component';
import { UserAbmComponent } from '../../components/user/dialog/user-abm/user-abm.component';
import { RolAbmComponent } from '../../components/user/dialog/rol-abm/rol-abm.component';
import { AlertGridComponent } from '../../components/user/alert-grid/alert-grid.component';

@NgModule({
  declarations: [
    ProfileComponent,
    MenuComponent,
    GridComponent,
    UserAbmComponent,
    RolAbmComponent,
    AlertGridComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutes,
    AngularSlickgridModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  exports: [],
  entryComponents: [UserAbmComponent, RolAbmComponent],
  providers: [],
})
export class ProfileModule {}
