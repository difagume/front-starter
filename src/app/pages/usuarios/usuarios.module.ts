import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsuarioService } from '../../services/usuario.service';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutes } from './usuarios.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(UsuariosRoutes),
    NgbAccordionModule,
    NgxDatatableModule,
    NgbModule
  ],
  declarations: [UsuariosComponent],
  providers: [UsuarioService]
})

export class UsuariosModule { }
