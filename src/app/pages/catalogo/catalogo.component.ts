import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo, Producto, Menu } from '../../models';
import { CatalogoService } from '../../services/catalogo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  menu$: Observable<Menu[]>;
  producto$: Observable<Producto[]>;
  productosSeleccionados: Producto[] = [];
  valorTotal = 0;
  ganancia = 0;
  articulo = new Articulo(null, null, 0, true, null, null, []);

  constructor(private catalogoService: CatalogoService) { }

  ngOnInit() {
    // this.obtenerProductos();
    this.producto$ = this.catalogoService.obtenerProductos();
    this.menu$ = this.catalogoService.obtenerMenu();
  }

  valTotal() {
    this.valorTotal = 0;
    this.productosSeleccionados.forEach(p => {
      this.valorTotal += +p.valor * +p.cantidad;
    });

    // if (this.articulo.valor === 0) {
    this.articulo.valor = this.valorTotal;
    // }
  }

  gananciaPorPlato() {
    this.ganancia = this.articulo.valor - this.valorTotal;
  }

  /* getProductos(term: string = null): Observable<Producto[]> {
    let items = this.productos;
    if (term) {
      items = items.filter(x => x.nombre.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    }
    return of(items).pipe(delay(500));
  } */

  onChange() {
    // console.log({ name: '(change)', value: $event });
    // console.log(this.productosSeleccionados);
    this.valTotal();
    this.gananciaPorPlato();
  }

  cambiaCantidad() {
    // console.log(event);
    // console.log(this.productosSeleccionados);
    this.valTotal();
    this.gananciaPorPlato();
  }

  cambiaPVP() {
    // console.log(event);
    // console.log(this.productosSeleccionados);
    this.gananciaPorPlato();
  }

  // guardarArticulo(forma: NgForm) {
  guardarArticulo() {
    // console.log('forma: ', forma);
    console.log('articulo: ', this.articulo);
    console.log('productos: ', this.productosSeleccionados);
  }
  /**
   * Obtengo todos los productos activos
   */
  /* obtenerProductos() {
    this.catalogoService.obtenerProductos()
      .subscribe((res: Producto[]) => {
        this.productos = res;
        this.producto$ = this.getProductos();
      });
  } */

}
