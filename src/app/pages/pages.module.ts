import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AboutComponent, DashboardComponent, DocsComponent, PerfilComponent, UsuariosComponent } from '.';
import { UsuarioService } from '../services/usuario.service';
import { PagesRoutes } from './pages.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PagesRoutes),
    NgbModule,
    NgbAccordionModule,
    NgxDatatableModule
  ],
  declarations: [
    AboutComponent,
    DashboardComponent,
    DocsComponent,
    PerfilComponent,
    UsuariosComponent
  ],
  providers: [UsuarioService]
})

export class PagesModule { }
