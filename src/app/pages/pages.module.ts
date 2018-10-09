import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AboutComponent, CatalogoComponent, DashboardComponent, DocsComponent, PerfilComponent, UsuariosComponent } from '.';
import { URL_SERVICIOS } from '../config';
import { CatalogoService } from '../services/catalogo.service';
import { ParametrosService } from '../services/parametros.service';
import { UsuarioService } from '../services/usuario.service';
import { PagesRoutes } from './pages.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPermissionsModule.forChild(),
    RouterModule.forChild(PagesRoutes),
    NgbModule,
    NgSelectModule,
    NgbAccordionModule,
    NgxDatatableModule,
    NgxCurrencyModule,
    ApolloModule,
    HttpLinkModule
  ],
  declarations: [
    AboutComponent,
    DashboardComponent,
    DocsComponent,
    PerfilComponent,
    UsuariosComponent,
    CatalogoComponent
  ],
  providers: [
    UsuarioService,
    ParametrosService,
    CatalogoService,
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: `${URL_SERVICIOS}/graphql`
          })
        };
      },
      deps: [HttpLink]
    }
  ]
})

export class PagesModule { }
