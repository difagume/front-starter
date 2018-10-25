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
import { onError } from 'apollo-link-error';
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
import { URL_SERVICIOS } from './config';
import { ApolloLink, from, concat } from 'apollo-link';

declare let swal: any;

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

    // URI del servidor graphql-yoga donde escucha las peticiones de graphql
    const http = httpLink.create({ uri: URL_SERVICIOS });

    // Middleware para setear headers
    const authMiddleware = new ApolloLink((operation, forward) => {
      const currentUser = JSON.parse(localStorage.getItem('credentials'));
      if (currentUser && currentUser.token) {
        operation.setContext({
          headers: new HttpHeaders().set('Authorization', `Bearer ${currentUser.token}` || '')
        });
      }

      return forward(operation);
    });

    // Middleware para manejo de errorers de apollo (paquete: apollo-link-error)
    const errorMiddleware = onError(({ graphQLErrors }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          // console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
          swal('Error', message, 'error')
        );
      }
      // if (networkError) { console.log(`[Network error]: ${JSON.stringify(networkError)}`); }
    });

    // Con headers, manejo de errores
    apollo.create({
      link: from([authMiddleware, errorMiddleware, http]),
      cache: new InMemoryCache(),
    });

    // Con headers
    /* apollo.create({
      link: concat(authMiddleware, http),
      cache: new InMemoryCache(),
    }); */

    // Sin headers
    /* apollo.create({
      link: httpLink.create({ uri: `${URL_SERVICIOS}/graphql` }),
      cache: new InMemoryCache(),
    }); */
  }
}
