import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../models';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  producto$: Observable<Producto[]>;
  productosSeleccionados: Producto[] = [];
  valorTotal = 0;

  constructor(private catalogoService: CatalogoService) { }

  ngOnInit() {
    // this.obtenerProductos();
    this.producto$ = this.catalogoService.obtenerProductos();
  }

  valTotal() {
    this.valorTotal = 0;
    this.productosSeleccionados.forEach(p => {
      this.valorTotal += +p.valor * +p.cantidad;
    });
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
  }

  cambiaCantidad() {
    // console.log(event);
    // console.log(this.productosSeleccionados);
    this.valTotal();
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
