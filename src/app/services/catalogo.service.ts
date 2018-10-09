import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../core';
import { Articulo } from '../models';

@Injectable(/* {
  providedIn: PagesModule
} */)
export class CatalogoService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService,
    private apollo: Apollo) { }

  /* obtenerProductos() {
    const url = `${URL_SERVICIOS}/catalogo/productos`;
    return this.http.get(url)
      .pipe(map((res: any) => {
        res.productos.forEach(p => {
          p.cantidad = 1;
        });
        return res.productos;
      }));
  } */

  allProductos() {
    return this.apollo.watchQuery({ query: allProductos }).valueChanges
      .pipe(map(({ data }) => {

        data['allProductos'].productos.map(producto => {
          // Agrego a cada producto la propiedad: cantidad
          producto['cantidad'] = 1;
        });
        return data['allProductos'].productos;
      }));
  }

  allArticulos() {
    return this.apollo.watchQuery({ query: allArticulos });
  }

  /* obtenerMenu() {
    const url = `${URL_SERVICIOS}/catalogo/menu`;
    return this.http.get(url)
      .pipe(map((res: any) => {
        return res.menu;
      }));
  } */

  allMenus() {
    return this.apollo.watchQuery({ query: allMenus }).valueChanges
      .pipe(map(({ data }) => data['allMenus'].menus));
  }

  /* crearArticulo(articulo: Articulo) {
    const url = `${URL_SERVICIOS}/catalogo/articulo?token=${this.authenticationService.credentials.token}`;
    return this.http.post(url, articulo);
  } */

  createArticulo(articulo: Articulo) {
    return this.apollo.mutate({
      mutation: createArticulo,
      variables: {
        articuloNombre: articulo.nombre,
        articulovalor: articulo.valor,
        articuloIdMenu: articulo.idMenu,
        articuloTiempoPreparacion: articulo.tiempoPreparacion,
        articuloDetalles: articulo.articuloDetalle
      }
    });
  }

  /* obtenerArticulos() {
    const url = `${URL_SERVICIOS}/catalogo/articulos`;
    return this.http.get(url)
      .pipe(map((res: any) => {
        return res.articulos;
      }));
  } */
}

const allArticulos = gql`
      {
        allArticulos(orderBy: ID_ASC, condition: { activo: true }) {
          nodes {
            id
            nombre
            valor
            activo
            tiempoPreparacion
            menu: menuByIdMenu {
              id
              nombre
            }
            articuloDetalle: articuloDetallesByIdArticulo(condition: { activo: true }) {
              nodes {
                id
                activo
                cantidad
                producto: productoByIdProducto {
                  id
                  nombre
                  valor
                  stock
                }
              }
            }
          }
        }
      }
    `;

const allMenus = gql`
  {
    allMenus(orderBy: ID_ASC, condition: { activo: true }) {
      menus: nodes {
        id
        nombre
      }
    }
  }
`;

const allProductos = gql`
  {
    allProductos(orderBy: ID_ASC, condition: { activo: true }) {
      productos: nodes {
        id
        nombre
        valor
      }
    }
  }
`;

const createArticulo = gql`
  mutation(
    $articuloNombre: String!
    $articulovalor: BigFloat!
    $articuloIdMenu: BigInt!
    $articuloTiempoPreparacion: Time!
    $articuloDetalles: [FkArticuloDetalleAticuloArticuloDetalleCreateInput!]
  ) {
    createArticulo(
      input: {
        articulo: {
          nombre: $articuloNombre
          valor: $articulovalor
          idMenu: $articuloIdMenu
          tiempoPreparacion: $articuloTiempoPreparacion
          articuloDetallesUsingId: { create: $articuloDetalles }
        }
      }
    ) {
      articulo {
        id
        nombre
        valor
        activo
        idMenu
        articuloDetalle: articuloDetallesByIdArticulo {
          nodes {
            producto: productoByIdProducto {
              nombre
            }
            cantidad
          }
        }
        tiempoPreparacion
      }
    }
  }
`;
