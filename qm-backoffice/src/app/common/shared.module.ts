//Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SafeHtmlPipe } from '../pipe/safe-html.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import localeEsAr from '@angular/common/locales/es-AR';

//Components
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Error404Component } from './error404/error404.component';
import { FooterComponent } from './footer/footer.component';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

registerLocaleData(localeEsAr);
@NgModule({
  declarations: [
    Error404Component,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SafeHtmlPipe,
    SnackBarComponent,
    DialogComponent,
    BreadcrumbsComponent
  ],
  imports: [RouterModule, CommonModule, MatSnackBarModule, MatDialogModule],
  exports: [
    Error404Component,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    MatDatepickerModule,
    NgbModule,
    MatDialogModule,
    DragDropModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SafeHtmlPipe,
    MatSlideToggleModule,
    NgSelectModule,
    NgOptionHighlightModule,
    MatRadioModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [SnackBarComponent, DialogComponent]
})
export class SharedModule {}
