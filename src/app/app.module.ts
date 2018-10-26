import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { AgmCoreModule } from '@agm/core';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { NgxPermissionsModule } from 'ngx-permissions';

import {
  MenuComponent,
  HeaderComponent,
  SidebarComponent,
  FooterComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective,
  AuthenticationService
} from './core';
import { AuthenticationGuard } from './core/authentication/authentication.guard';
import { ErrorInterceptorProvider } from './core/helpers/error.interceptor';
import { GraphQLModule } from './apollo.config';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgxPermissionsModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LoadingBarRouterModule,
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'YOURAPIKEY' }),
    GraphQLModule
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    ErrorInterceptorProvider,
    // JwtInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
