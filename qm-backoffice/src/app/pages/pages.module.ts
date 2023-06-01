// Modules libraries
import { NgModule } from '@angular/core';

// Routes
import { PagesRoutes } from './pages.routes';

// Modules
import { SharedModule } from '../common/shared.module';

// Components main
import { PagesComponent } from './pages.component';

// Components
import { HomeComponent } from './home/home.component';
import { RestaurantModule } from './restaurant/restaurant.module';

@NgModule({
  declarations: [PagesComponent, HomeComponent],
  imports: [PagesRoutes, RestaurantModule],
  exports: [SharedModule],
  entryComponents: [],
  providers: []
})
export class PagesModule {}
