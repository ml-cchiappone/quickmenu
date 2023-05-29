// Modules libraries
import { NgModule } from '@angular/core';

// Routes
import { PagesRoutes } from './pages.routes';

// Modules
import { ContactModule } from './contact/contact.module';
import { SharedModule } from '../common/shared.module';

// Components main
import { PagesComponent } from './pages.component';

// Components
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [PagesComponent, HomeComponent],
  imports: [PagesRoutes, ContactModule],
  exports: [SharedModule],
  entryComponents: [],
  providers: []
})
export class PagesModule {}
