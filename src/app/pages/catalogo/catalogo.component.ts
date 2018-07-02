import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo, ArticuloDetalle, Menu, Producto } from '../../models';
import { CatalogoService } from '../../services/catalogo.service';

declare let swal: any;

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  @ViewChild('myTable') table: any;

  menu$: Observable<Menu[]>;
  producto$: Observable<Producto[]>;
  productosSeleccionados: Producto[] = [];
  articulo$: Observable<any[]>;
  valorTotal = 0;
  ganancia = 0;
  articulo = new Articulo(null, null, 0, true, null, null, []);
  detalle: any = {};
  columns = [
    { prop: 'nombre' },
    { name: 'valor' }
  ];

  constructor(private catalogoService: CatalogoService) { }

  ngOnInit() {
    this.articulo$ = this.catalogoService.obtenerArticulos();
    this.producto$ = this.catalogoService.obtenerProductos();
    this.menu$ = this.catalogoService.obtenerMenu();
  }

  valTotal() {
    this.valorTotal = 0;
    this.productosSeleccionados.forEach(p => {
      this.valorTotal += +p.valor * +p.cantidad;
    });

    this.articulo.valor = this.valorTotal;
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
    this.valTotal();
    this.gananciaPorPlato();
  }

  cambiaCantidad() {
    this.valTotal();
    this.gananciaPorPlato();
  }

  cambiaPVP() {
    this.gananciaPorPlato();
  }

  // guardarArticulo(forma: NgForm) {
  // console.log('forma: ', forma);
  guardarArticulo() {
    this.articulo.articuloDetalle = [];
    this.productosSeleccionados.forEach(producto => {
      let articuloDetalle: ArticuloDetalle;
      articuloDetalle = new ArticuloDetalle(null, null, producto.id, producto.cantidad, true);
      this.articulo.articuloDetalle.push(articuloDetalle);
    });

    console.log('articulo: ', this.articulo);
    this.catalogoService.crearArticulo(this.articulo)
      .subscribe((data: any) => {
        swal(data.name, data.message, 'success');
      }, error => { });
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }
}
