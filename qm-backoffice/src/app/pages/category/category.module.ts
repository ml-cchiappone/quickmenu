// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { QuillModule } from 'ngx-quill';

//Routes
import { CategoryRoutes } from './category.routes';

// Components
import { CategoryComponent } from './category.component';
import { GridComponent } from '../../components/category/grid/grid.component';
import { CategoryAbmComponent } from '../../components/category/dialog/category-abm/category-abm.component';

@NgModule({
  declarations: [CategoryComponent, GridComponent, CategoryAbmComponent],
  imports: [
    SharedModule,
    CategoryRoutes,
    AngularSlickgridModule.forRoot(),
    QuillModule.forRoot(),
  ],
  exports: [CategoryComponent, GridComponent, SharedModule],
  entryComponents: [CategoryAbmComponent],
  providers: [],
})
export class CategoryModule {}
