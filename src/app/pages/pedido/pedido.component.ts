import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.obtenerMenus();
  }

  obtenerMenus() {
    this.subscriptions.add(
      this.pedidoService.obtenerMenusArticulos().valueChanges
        .subscribe(
          ({ data, loading }) => {
            this.cargando = loading;

            console.log('---> ', data);


            this.menusArticulos = data && data['menusArticulos'];
          })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
