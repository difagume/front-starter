import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Producto } from '../../models';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  productos: Producto[] = [];
  productosSeleccionados: Producto[] = [];

  constructor(private catalogoService: CatalogoService) { }

  ngOnInit() {
    this.obtenerProductos();
    // this.producto$ = this.catalogoService.obtenerProductos();
  }

  /* getProductos(term: string = null): Observable<Producto[]> {
    let items = this.productos;
    if (term) {
      items = items.filter(x => x.nombre.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    }
    return of(items).pipe(delay(500));
  } */

  onChange($event) {
    // console.log({ name: '(change)', value: $event });
    console.log(this.productosSeleccionados);
    console.log('p:', this.productos);
  }

  cambiaCantidad(event) {
    // console.log(event);
    console.log(this.productosSeleccionados);
    console.log('p:', this.productos);
  }

  /**
   * Obtengo todos los productos activos
   */
  obtenerProductos() {
    this.catalogoService.obtenerProductos()
      .subscribe((res: Producto[]) => {
        this.productos = res;
        // this.producto$ = this.getProductos();
      });
  }

}
