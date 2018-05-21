import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { PerfilRoutes } from './perfil.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PerfilRoutes)],
  declarations: [PerfilComponent]
})
export class PerfilModule { }
