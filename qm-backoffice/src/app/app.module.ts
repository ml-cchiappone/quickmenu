// Modules
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// Routes and Config
import { APP_ROUTES } from './app.routes';
import { WS_URL } from './config/config';

// Interceptors
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import getToken from './common/auth/token';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { RecoverFormComponent } from './pages/recover-form/recover-form.component';

const config: SocketIoConfig = {
  url: WS_URL,
  options: { withCredentials: true }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoverComponent,
    RecoverFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTES,
    PagesModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
