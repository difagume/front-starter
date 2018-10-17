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
    return this.apollo.query({ query: allProductos })
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
    return this.apollo.query({ query: allMenus })
      .pipe(map(({ data }) => data['allMenus'].menus));
  }

  /* crearArticulo(articulo: Articulo) {
    const url = `${URL_SERVICIOS}/catalogo/articulo?token=${this.authenticationService.credentials.token}`;
    return this.http.post(url, articulo);
  } */

  crearArticulo(articulo: Articulo) {
    return this.apollo.mutate({
      mutation: CreateArticulo,
      variables: {
        articuloNombre: articulo.nombre,
        articulovalor: articulo.valor,
        articuloIdMenu: articulo.idMenu,
        articuloTiempoPreparacion: articulo.tiempoPreparacion,
        articuloDetalles: articulo.articuloDetalle
      },
      update: (store, { data: { createArticulo } }) => {
        // Read the data from our cache for this query.
        const data: any = store.readQuery({ query: allArticulos });
        // Add our comment from the mutation to the end.
        data.allArticulos.nodes.push(createArticulo.articulo);
        // Write our data back to the cache.
        store.writeQuery({ query: allArticulos, data });
      },
    });
  }

  /* obtenerArticulos() {
    const url = `${URL_SERVICIOS}/catalogo/articulos`;
    return this.http.get(url)
      .pipe(map((res: any) => {
        return res.articulos;
      }));
  } */

  eliminarArticulo(articulo: Articulo) {
    return this.apollo.mutate({
      mutation: DeleteArticulo,
      variables: {
        idArticulo: articulo.id
      },
      update: (store, { data: { eliminarArticulo } }) => {
        const data: any = store.readQuery({ query: allArticulos });
        const indice = data.allArticulos.nodes.map(art => art.id).indexOf(eliminarArticulo.articulo.id);
        data.allArticulos.nodes.splice(indice, 1);
        store.writeQuery({ query: allArticulos, data });
      },
    });
  }

  actualizarArticulo(articulo: Articulo) {
    return this.apollo.mutate({
      mutation: UpdateArticulo,
      variables: {
        articuloId: articulo.id,
        articuloNombre: articulo.nombre,
        articulovalor: articulo.valor,
        articuloIdMenu: articulo.idMenu,
        articuloTiempoPreparacion: articulo.tiempoPreparacion
        // articuloDetalles: articulo.articuloDetalle
      },
      /* update: (store, { data: { createArticulo } }) => {
        // Read the data from our cache for this query.
        const data: any = store.readQuery({ query: allArticulos });
        // Add our comment from the mutation to the end.
        data.allArticulos.nodes.push(createArticulo.articulo);
        // Write our data back to the cache.
        store.writeQuery({ query: allArticulos, data });
      }, */
    });
  }

}

const allArticulos = gql`
  query AllArticulos {
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

const CreateArticulo = gql`
  mutation createArticulo(
    $articuloNombre: String!
    $articulovalor: BigFloat!
    $articuloIdMenu: BigInt!
    $articuloTiempoPreparacion: Time!
    $articuloDetalles: [FkArticuloDetalleArticuloArticuloDetalleCreateInput!]
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
        tiempoPreparacion
        menu: menuByIdMenu {
          id
          nombre
        }
        articuloDetalle: articuloDetallesByIdArticulo {
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


const DeleteArticulo = gql`
  mutation eliminarArticulo($idArticulo: BigInt!) {
    eliminarArticulo: deleteArticuloById(input: { id: $idArticulo }) {
      articulo {
        id
        nombre
      }
    }
  }
`;

const UpdateArticulo = gql`
  mutation updateArticuloById(
    $articuloId: BigInt!
    $articuloNombre: String!
    $articulovalor: BigFloat!
    $articuloIdMenu: BigInt!
    $articuloTiempoPreparacion: Time!
  ) {
    updateArticuloById(
      input: {
        id: $articuloId
        articuloPatch: {
          nombre: $articuloNombre
          valor: $articulovalor
          idMenu: $articuloIdMenu
          tiempoPreparacion: $articuloTiempoPreparacion
        }
      }
    ) {
      articulo {
        id
        nombre
        valor
        activo
        tiempoPreparacion
        menu: menuByIdMenu {
          id
          nombre
        }
      }
    }
  }
`;
