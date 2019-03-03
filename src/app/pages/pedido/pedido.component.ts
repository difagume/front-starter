import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../core';
import { Articulo, OrdenCreateInput, OrdenDetalleCreateInput } from '../../generated/graphql';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})

export class PedidoComponent implements OnInit, OnDestroy {
  menusArticulos: any[];
  cargando = true;
  orden: OrdenCreateInput = {
    fecha: new Date(),
    mesero: { connect: { id: this.authenticationService.credentials.id } }
  };
  ordenDetalle: OrdenDetalleCreateInput[] = [];
  private subscriptions = new Subscription();

  constructor(private pedidoService: PedidoService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.obtenerMenus();
  }

  obtenerMenus() {
    this.subscriptions.add(
      this.pedidoService.obtenerMenusArticulos().valueChanges
        .subscribe(
          ({ data, loading }) => {
            this.cargando = loading;

            // console.log('---> ', data);

            this.menusArticulos = data && data['menusArticulos'];
          })
    );
  }

  agregarPedido(articulo: Articulo) {
    let articuloEncontrado = false;
    // Busco si ya esta agregado
    this.ordenDetalle.map(a => {
      if (a.descripcion.connect.id === articulo.id) {
        // console.log('existe id:', a.descripcion.connect.id);
        a.cantidad = a.cantidad + 1;
        articuloEncontrado = true;
      }
    });

    if (!articuloEncontrado) {
      const pedido: OrdenDetalleCreateInput = {
        cantidad: 1,
        descripcion: {
          connect: { id: articulo.id }
        },
        valor_unitario: articulo.valor,
        orden: {
          create: {
            fecha: formatDate(new Date(), 'yyyy/MM/dd', 'es-EC'),
            mesero: {
              connect: { id: this.authenticationService.credentials.id }
            }
          }
        }
      };

      this.ordenDetalle.push(pedido);
    }
    console.log('detalle --> ', this.ordenDetalle);
    this.toastr.success('Agregado al pedido!', articulo.nombre);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
