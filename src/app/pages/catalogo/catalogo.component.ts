import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap } from 'rxjs/operators';
import { ArticuloCreateInput, ArticuloDetalleCreateWithoutArticuloInput, ArticuloUpdateInput } from '../../generated/graphql';
import { CatalogoService } from '../../services/catalogo.service';
declare let swal: any;

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  @ViewChild('myTable') table: any;

  articulos: any[];
  temp = [];
  menus: Observable<any>;
  productos: Observable<any>;
  productosSeleccionados: any[] = [];
  valorTotal = 0;
  ganancia = 0;
  articulo: any;
  articuloCrear: ArticuloCreateInput;
  articuloActualizar: ArticuloUpdateInput;
  // articulos_detalleEliminar: ArticuloDetalleWhereUniqueInput[] = [];
  articuloEliminar: any = {};
  articuloIndex;
  detalle: any = {};
  cargando = true;
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
    // private ref: ChangeDetectorRef
  ) {
    this.keyUp.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      flatMap(search => of(search).pipe(delay(300)))
    ).subscribe(() => this.cambiaPVP());
  }

  ngOnInit() {
    this.obtenerArticulos();
    this.productos = this.catalogoService.allProductos();
    this.menus = this.catalogoService.allMenus();
  }

  obtenerArticulos() {
    this.catalogoService.allArticulos()
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.cargando = loading;
        this.error = data['error'];

        // Agrego una propiedad al articulo para tener el nombre del menu
        data['articulos'].map(art => {
          art['articulo_menu'] = art.menu.nombre;
        });

        this.temp = [...data['articulos']];
        this.articulos = data && data['articulos'];

      }, (err) => {
        console.log(err);
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

    if (this.articulo) {

      setTimeout(() => {
        this.scrollTo('editar');
      }, 250);

      this.articulo.tiempo_preparacion = moment.utc(this.articulo.tiempo_preparacion).format('HH:mm');

      // Lleno productosSeleccionados del artículo que voy a editar
      if (this.articulo.articuloDetalle) {
        this.productosSeleccionados = [];
        this.valorTotal = 0;

        this.articulo.articuloDetalle.forEach(articuloDetalle => {
          this.productosSeleccionados.push({
            ...articuloDetalle.producto, cantidad: articuloDetalle.cantidad
          });

          // this.articulos_detalleEliminar.push({ id: articuloDetalle.id });

          this.valorTotal += +articuloDetalle.producto.valor * +articuloDetalle.cantidad;
        });
      }

      this.gananciaPorPlato();
    }
  }

  scrollTo(className: string): void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Método que agrega un artículo y sus detalles
   */
  crearArticulo() {
    const articulosDetalle: ArticuloDetalleCreateWithoutArticuloInput[] = [];
    this.productosSeleccionados.forEach(producto => {

      articulosDetalle.push({
        cantidad: producto.cantidad,
        producto: {
          connect: { id: producto.id.toString() }
        }
      });
    });

    this.articuloCrear = {
      nombre: this.articulo.nombre,
      valor: this.articulo.valor,
      tiempo_preparacion: 'T'.concat(this.articulo.tiempo_preparacion),
      menu: { connect: { id: this.articulo.menu.id } },
      articulos_detalle: { create: articulosDetalle }
    };

    this.catalogoService.crearArticulo(this.articuloCrear)
      .subscribe(({ data }) => {

        this.limpiarData();
        swal('Artículo creado 😏', `El artículo: ${data.createArticulo.nombre} ha sido creado`, 'success');

      }, (error: string) => {
        console.log(error);
        if (error.toString().includes('uk_item_nombre')) {
          swal('Error al crear el artículo 😪', `El artículo con ese nombre ya existe`, 'error');
        }
        // else {
        //  swal('Error al crear el artículo 😪', `El artículo ${this.articulo.nombre} no ha sido creado`, 'error');
        // }
      });
  }

  /**
   * Método que actualiza un artículo seleccionado
   */
  actualizarArticulo() {
    const articulos_detalleCrear: ArticuloDetalleCreateWithoutArticuloInput[] = [];
    this.productosSeleccionados.forEach(producto => {
      articulos_detalleCrear.push({
        cantidad: producto.cantidad,
        producto: { connect: { id: producto.id, nombre: producto.nombre } }
      });
    });
    // Lleno el objeto articuloActualizar
    this.articuloActualizar = {
      nombre: this.articulo.nombre,
      valor: this.articulo.valor,
      // tiempo_preparacion: moment(this.articulo.tiempo_preparacion).format('HH:mm'),
      tiempo_preparacion: 'T'.concat(this.articulo.tiempo_preparacion),
      menu: { connect: { id: this.articulo.menu.id } },
      articulos_detalle: {
        create: articulos_detalleCrear,
        // delete: this.articulos_detalleEliminar
      }
    };

    this.catalogoService.eliminarArticuloDetalles(this.articulo.id)
      .subscribe();

    this.catalogoService.actualizarArticulo(this.articuloActualizar, this.articulo.id)
      .subscribe(({ data }) => {

        this.limpiarData();
        swal('Artículo actualizado 😏', `El artículo: ${data.updateArticulo.nombre} ha sido actualizado`, 'success');

      }, (error: string) => {
        console.log(error);
        /* if (error.toString().includes('uk_item_nombre')) {
          swal('Error al crear el artículo 😪', `El artículo con ese nombre ya existe`, 'error');
        } */
        /* else {
          swal('Error al crear el artículo 😪', `El artículo ${this.articulo.nombre} no ha sido creado`, 'error');
        } */
      });
  }

  /**
   * Función que se llama al hacer click en el botón de elimimar articulo
   * @param id del articulo a ser eliminado
   */
  eliminarArticulo(id) {
    this.articulo = null;
    this.temp = [...this.articulos];
    this.articuloEliminar = this.temp.find(art => art.id === id);
    this.articuloIndex = this.temp.indexOf(this.articuloEliminar);
    swal({
      title: '¿Estás seguro?',
      text: 'Estás a punto de eliminar al artículo: ' + this.articuloEliminar.nombre,
      icon: 'warning',
      buttons: ['Cancelar', true],
      dangerMode: true,
    })
      .then(eliminar => {
        if (eliminar) {
          this.catalogoService.eliminarArticulo(this.articuloEliminar)
            .subscribe(({ data }) => {

              swal('Artículo eliminado 😪', `El artículo: ${data['eliminarArticulo'].nombre} ha sido eliminado`, 'success');

            }, (error) => {
              console.log(error);
            });
        }
      });
  }

  /**
   * Método invocado desde el botón de Agregar
   */
  agregarArticulo() {
    setTimeout(() => {
      this.scrollTo('editar');
    }, 250);
    this.articulo = { menu: {} };
  }

  /**
   * Método invocado desde el botón de Guardar
   */
  crear_actualizarArticulo() {
    if (this.articulo) {
      if (this.articulo.id) {
        this.actualizarArticulo();
      } else {
        this.crearArticulo();
      }
    }
  }

  toggleExpandRow(row) {
    // console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  limpiarData() {
    this.productosSeleccionados = [];
    this.articulo = null;
    this.articuloCrear = null;
    this.articuloActualizar = null;
  }

}
