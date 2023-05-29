// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { QuillModule } from 'ngx-quill';

//Routes
import { ContactRoutes } from './contact.routes';

// Components
import { ContactComponent } from './contact.component';
import { GridComponent } from '../../components/contact/grid/grid.component';
import { ContactAbmComponent } from '../../components/contact/dialog/contact-abm/contact-abm.component';

@NgModule({
  declarations: [
    ContactComponent,
    GridComponent,
    ContactAbmComponent,
  ],
  imports: [
    SharedModule,
    ContactRoutes,
    AngularSlickgridModule.forRoot(),
    QuillModule.forRoot()
  ],
  exports: [ContactComponent, GridComponent, SharedModule],
  entryComponents: [ContactAbmComponent],
  providers: []
})
export class ContactModule {}
