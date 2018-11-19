import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})

export class PedidoComponent implements OnInit, OnDestroy {
  menusArticulos: any[];
  cargando = true;
  private subscriptions = new Subscription();

  constructor(private apollo: Apollo,
    private pedidoService: PedidoService) { }

  ngOnInit() {
    this.obtenerMenusArticulos();
  }

  obtenerMenusArticulos() {
    this.subscriptions.add(
      this.pedidoService.obtenerMenusArticulos().valueChanges
        .subscribe(
          ({ data, loading }) => {

            console.log('---> ', data);

            this.cargando = loading;
            this.menusArticulos = data && data['menusArticulos'];
          })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
