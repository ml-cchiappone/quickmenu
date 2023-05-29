// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { QuillModule } from 'ngx-quill';

//Routes
import { ProductRoutes } from './product.routes';

// Components
import { ProductComponent } from './product.component';
import { GridComponent } from '../../components/product/grid/grid.component';
import { ProductAbmComponent } from '../../components/product/dialog/product-abm/product-abm.component';

@NgModule({
  declarations: [ProductComponent, GridComponent, ProductAbmComponent],
  imports: [
    SharedModule,
    ProductRoutes,
    AngularSlickgridModule.forRoot(),
    QuillModule.forRoot(),
  ],
  exports: [ProductComponent, GridComponent, SharedModule],
  entryComponents: [ProductAbmComponent],
  providers: [],
})
export class ProductModule {}
