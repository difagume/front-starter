import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../core';
import { Articulo, OrdenCreateInput, OrdenDetalleCreateInput, OrdenDetalle } from '../../generated/graphql';
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
  crearOrdenDetalle: OrdenDetalleCreateInput[] = [];
  ordenDetalle: OrdenDetalle[] = [];
  subtotal = 0.0;
  total = 0.0;
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

            console.log('---> ', data);

            this.menusArticulos = data && data['menusArticulos'];
          })
    );
  }

  agregarPedido(articulo: Articulo) {
    let articuloEncontrado = false;
    // Busco si ya esta agregado
    this.ordenDetalle.map(a => {
      if (a.descripcion.id === articulo.id) {
        // console.log('existe id:', a.descripcion.connect.id);
        a.cantidad = a.cantidad + 1;

        this.subtotal = this.subtotal + a.valor_unitario;
        this.total = this.subtotal * 1.12;

        articuloEncontrado = true;
      }
    });

    if (!articuloEncontrado) {
      /* const pedido: OrdenDetalleCreateInput = {
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
      }; */

      const pedido: OrdenDetalle = {
        cantidad: 1,
        descripcion: {
          id: articulo.id, nombre: articulo.nombre, activo: true, valor: articulo.valor, menu: articulo.menu
        },
        valor_unitario: articulo.valor, id: null, gratis: false, activo: true, orden: null
      };

      this.subtotal = this.subtotal + articulo.valor;
      this.total = this.subtotal * 1.12;

      this.ordenDetalle.push(pedido);
    }
    console.log('detalle --> ', this.ordenDetalle);
    this.toastr.success('Agregado al pedido!', articulo.nombre, { timeOut: 2000 });
  }

  agregarArticulo(idArticulo) {
    this.ordenDetalle.map(a => {
      if (a.descripcion.id === idArticulo) {
        a.cantidad = a.cantidad + 1;

        this.subtotal = this.subtotal + a.valor_unitario;
        this.total = this.subtotal * 1.12;
      }
    });
  }

  restarArticulo(idArticulo) {
    for (let index = 0; index < this.ordenDetalle.length; index++) {
      const articulo = this.ordenDetalle[index];
      if (articulo.descripcion.id === idArticulo) {
        if (articulo.cantidad === 1) {
          this.ordenDetalle.splice(index, 1);

          this.subtotal = this.subtotal - articulo.valor_unitario;
          this.total = this.subtotal * 1.12;
          break;
        } else {
          articulo.cantidad = articulo.cantidad - 1;
          this.subtotal = this.subtotal - articulo.valor_unitario;
          this.total = this.subtotal * 1.12;
          break;
        }
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
