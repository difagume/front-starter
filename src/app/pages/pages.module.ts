import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AboutComponent, CatalogoComponent, DashboardComponent, DocsComponent, PerfilComponent, UsuariosComponent } from '.';
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
    NgxDatatableModule
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
    ParametrosService
  ]
})

export class PagesModule { }
