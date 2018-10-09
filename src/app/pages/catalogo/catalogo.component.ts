import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap } from 'rxjs/operators';
import { Articulo, ArticuloDetalle, Producto, Menu } from '../../models';
import { CatalogoService } from '../../services/catalogo.service';
declare let swal: any;

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  @ViewChild('myTable') table: any;

  // articulos = [];
  articulos: any[];
  temp = [];
  // menu$: Observable<Menu[]>;
  menus: Observable<any>;
  // producto$: Observable<Producto[]>;
  productos: Observable<any>;
  productosSeleccionados: Producto[] = [];
  // articulo$: Observable<any[]>;
  valorTotal = 0;
  ganancia = 0;
  articulo = new Articulo(null, null, 0, true, null, null, []);
  articuloIndex;
  detalle: any = {};
  cargando = false;
  error: any;
  public keyUp = new Subject<void>();
  /*  columns = [
     { prop: 'nombre' },
     { name: 'menu' },
     { name: 'valor' },
     { name: 'tiempo_preparacion' }
   ]; */

  constructor(
    private catalogoService: CatalogoService,
    private ref: ChangeDetectorRef
  ) {
    this.keyUp.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      flatMap(search => of(search).pipe(delay(300)))
    ).subscribe(() => this.cambiaPVP());
  }

  ngOnInit() {
    // this.obtenerArticulos();
    this.obtenerArticulos();
    // this.articulo$ = this.catalogoService.obtenerArticulos();
    // this.producto$ = this.catalogoService.obtenerProductos();
    this.productos = this.catalogoService.allProductos();
    // this.menu$ = this.catalogoService.obtenerMenu();
    this.menus = this.catalogoService.allMenus();
  }

  /* obtenerArticulos() {
    this.cargando = true;
    this.catalogoService.obtenerArticulos()
      .subscribe((articulos: Articulo[]) => {
        this.temp = [...articulos];
        this.articulos = articulos;
        this.cargando = false;
        this.ref.detectChanges();
      }, error => { });
  } */

  obtenerArticulos() {
    this.catalogoService.allArticulos()
      .valueChanges.subscribe(({ data, loading }) => {
        this.cargando = loading;
        this.error = data['error'];

        // Agrego una propiedad al articulo para tener el nombre del menu
        data['allArticulos'].nodes.map(art => {
          art['articulo_menu'] = art.menu.nombre;
        });

        this.temp = [...data['allArticulos'].nodes];
        this.articulos = data && data['allArticulos'].nodes;

        console.log('ARTICULOS: ', this.articulos);

      }, (err) => {
        this.error = err;
        this.cargando = false;
      });
  }

  /**
  * Función que filtra una columna de la tabla
  * @param event
  */
  /* updateFilter(event) {
    const val = event.target.value;
    // filter our data
    const temp = this.temp.filter(d => {
      return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the data
    this.articulos = temp;
  } */

  /**
   * Filtro para todas las columnas
   */
  updateFilter(event) {
    const val = event.target.value;

    const temp = this.temp.filter(
      item => Object.keys(item).some(
        k => item[k] != null && item[k].toString().toLowerCase()
          .includes(val.toLowerCase()))
    );
    this.articulos = temp;
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

  /**
   * Función que se llama al hacer clic en el botón de editar un articulo
   * @param id del articulo seleccionado para ser editado
   */
  editarArticulo(id) {
    // Seteo articulo seleccionado
    this.temp = [...this.articulos];
    this.articulo = this.temp.find(art => art.id === id);
    // this.productosSeleccionados = this.articulo.productos;
    console.log('artSelec:', this.articulo);
    this.articuloIndex = this.temp.indexOf(this.articulo);

    // Seteo roles del usuario
    // this.setearRolesUsuario();

    setTimeout(() => {
      this.scrollTo('editar');
    }, 250);
  }

  scrollTo(className: string): void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  // guardarArticulo(forma: NgForm) {
  // console.log('forma: ', forma);
  guardarArticulo() {
    this.articulo.articuloDetalle = [];
    this.productosSeleccionados.forEach(producto => {
      let articuloDetalle: ArticuloDetalle;
      articuloDetalle = new ArticuloDetalle(producto.id, producto.cantidad);
      this.articulo.articuloDetalle.push(articuloDetalle);
    });

    this.catalogoService.createArticulo(this.articulo)
      .subscribe(({ data }) => {
        // console.log(data['createArticulo'].articulo);
        swal('Artículo creado 😏',
          `El artículo: ${data['createArticulo'].articulo.nombre} ha sido creado`,
          'success');
      }, (error) => {
        console.log('there was an error sending the query', error);
      });

    /* this.catalogoService.crearArticulo(this.articulo)
      .subscribe((data: any) => {
        swal(data.name, data.message, 'success');

        // Actualizo listado de articulos
        // this.obtenerArticulos2();
      }, error => { }); */
  }

  toggleExpandRow(row) {
    // console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }
}
