import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { PerfilComponent } from './perfil.component';
import { PerfilRoutes } from './perfil.routing';

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(PerfilRoutes)],
  declarations: [PerfilComponent],
  providers: [UsuarioService]
})
export class PerfilModule { }
