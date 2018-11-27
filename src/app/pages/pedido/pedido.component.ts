import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { CatalogoService } from '../../services/catalogo.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})

export class PedidoComponent implements OnInit, OnDestroy {
  menus: any[];
  cargando = true;
  private subscriptions = new Subscription();

  constructor(private apollo: Apollo,
    private pedidoService: PedidoService,
    private catalogoService: CatalogoService) { }

  ngOnInit() {
    this.obtenerMenus();
  }

  obtenerMenus() {
    this.subscriptions.add(
      this.catalogoService.allMenus().valueChanges
        .subscribe(
          ({ data, loading }) => {
            this.cargando = loading;
            this.menus = data && data['menus'];
          })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
