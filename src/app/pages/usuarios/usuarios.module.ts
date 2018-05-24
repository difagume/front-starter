import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutes } from './usuarios.routing';
import { UsuarioService } from '../../services/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsuariosRoutes),
    NgbAccordionModule,
    NgxDatatableModule
  ],
  declarations: [UsuariosComponent],
  providers: [UsuarioService]
})

export class UsuariosModule { }
