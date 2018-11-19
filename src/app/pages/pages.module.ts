import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AboutComponent, CatalogoComponent, DashboardComponent, DocsComponent, PerfilComponent, UsuariosComponent } from '.';
import { SinimagenPipe } from '../pipes/sinimagen.pipe';
import { CatalogoService } from '../services/catalogo.service';
import { ParametrosService } from '../services/parametros.service';
import { PedidoService } from '../services/pedido.service';
import { UsuarioService } from '../services/usuario.service';
import { PagesRoutes } from './pages.routing';
import { PedidoComponent } from './pedido/pedido.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPermissionsModule.forChild(),
    RouterModule.forChild(PagesRoutes),
    NgSelectModule,
    NgbModule, // Tooltips, Dialogos
    NgxDatatableModule,
    NgxCurrencyModule
  ],
  declarations: [
    AboutComponent,
    DashboardComponent,
    DocsComponent,
    PerfilComponent,
    UsuariosComponent,
    CatalogoComponent,
    PedidoComponent,
    SinimagenPipe
  ],
  providers: [
    UsuarioService,
    ParametrosService,
    CatalogoService,
    PedidoService
  ]
})

export class PagesModule { }
