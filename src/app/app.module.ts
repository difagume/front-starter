import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
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

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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
import { JwtInterceptorProvider } from './core/helpers/jwt.interceptor';
import { URL_SERVICIOS } from './config';
import { concat, ApolloLink } from 'apollo-link';

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
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    ErrorInterceptorProvider,
    // JwtInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    // const http = httpLink.create({ uri: `${URL_SERVICIOS}/graphql` });

    /* const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext({
        headers: new HttpHeaders().set('Token', localStorage.getItem('token') || '')
      });

      return forward(operation);
    });

    apollo.create({
      link: concat(authMiddleware, http),
      cache: new InMemoryCache(),
    }); */

    apollo.create({
      // link: httpLink.create({ uri: `${URL_SERVICIOS}/die` }),
      link: httpLink.create({ uri: `${URL_SERVICIOS}/graphql` }),
      cache: new InMemoryCache(),
    });
  }
}
