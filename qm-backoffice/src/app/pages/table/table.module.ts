// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { QuillModule } from 'ngx-quill';

//Routes
import { TableRoutes } from './table.routes';

// Components
import { TableComponent } from './table.component';
import { GridComponent } from '../../components/table/grid/grid.component';
import { TableAbmComponent } from '../../components/table/dialog/table-abm/table-abm.component';

@NgModule({
  declarations: [TableComponent, GridComponent, TableAbmComponent],
  imports: [
    SharedModule,
    TableRoutes,
    AngularSlickgridModule.forRoot(),
    QuillModule.forRoot(),
  ],
  exports: [TableComponent, GridComponent, SharedModule],
  entryComponents: [TableAbmComponent],
  providers: [],
})
export class TableModule {}
