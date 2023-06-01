// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { QuillModule } from 'ngx-quill';

//Routes
import { RestaurantRoutes } from './restaurant.routes';

// Components
import { RestaurantComponent } from './restaurant.component';
import { GridComponent } from '../../components/restaurant/grid/grid.component';
import { RestaurantAbmComponent } from '../../components/restaurant/dialog/restaurant-abm/restaurant-abm.component';
import { RestaurantHomeComponent } from 'src/app/components/restaurant/home/home.component';
import { RestaurantUserAbmComponent } from 'src/app/components/restaurant/dialog/user-abm/restaurant-user-abm.component';
import { RestaurantOrderComponent } from 'src/app/components/restaurant/dialog/restaurant-order/restaurant-order.component';

@NgModule({
  declarations: [
    RestaurantComponent,
    GridComponent,
    RestaurantAbmComponent,
    RestaurantHomeComponent,
    RestaurantUserAbmComponent,
    RestaurantOrderComponent,
  ],
  imports: [
    SharedModule,
    RestaurantRoutes,
    AngularSlickgridModule.forRoot(),
    QuillModule.forRoot(),
    
  ],
  exports: [RestaurantComponent, GridComponent, SharedModule],
  entryComponents: [
    RestaurantAbmComponent,
    RestaurantUserAbmComponent,
    RestaurantOrderComponent,
  ],
  providers: [],
})
export class RestaurantModule {}
