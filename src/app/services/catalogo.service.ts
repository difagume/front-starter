import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../core';
import { ArticuloCreateInput } from '../generated/graphql';
import { Articulo } from '../models';

@Injectable(/* {
  providedIn: PagesModule
} */)
export class CatalogoService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService,
    private apollo: Apollo) { }

  allProductos() {
    return this.apollo.query({ query: allProductos })
      .pipe(map(({ data }) => {
        data['productos'].map(producto => {
          // Agrego a cada producto la propiedad: cantidad
          producto['cantidad'] = 1;
        });
        return data['productos'];
      }));
  }

  allArticulos() {
    return this.apollo.watchQuery({ query: allArticulos });
  }

  allMenus() {
    return this.apollo.query({ query: allMenus })
      .pipe(map(({ data }) => data['menus']));
  }

  crearArticulo(articulo: ArticuloCreateInput) {
    return this.apollo.mutate({
      mutation: CreateArticulo,
      variables: {
        data: articulo
      },
      update: (store, { data: { createArticulo } }) => {
        // Read the data from our cache for this query.
        const data: any = store.readQuery({ query: allArticulos });
        // Add our comment from the mutation to the end.
        data.articulos.push(createArticulo);
        // Write our data back to the cache.
        store.writeQuery({ query: allArticulos, data });
      },
    });
  }

  eliminarArticulo(articulo: Articulo) {
    return this.apollo.mutate({
      mutation: DeleteArticulo,
      variables: {
        id: articulo.id
      },
      update: (store, { data: { eliminarArticulo } }) => {
        const data: any = store.readQuery({ query: allArticulos });
        const indice = data.articulos.map(art => art.id).indexOf(eliminarArticulo.id);
        data.articulos.splice(indice, 1);
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
    articulos: articuloes(orderBy: id_ASC, where: { activo: true }) {
      id
      nombre
      valor
      tiempo_preparacion
      menu {
        id
        nombre
      }
      articuloDetalle: articulos_detalle {
        id
        cantidad
        producto {
          id
          nombre
          valor
          stock
        }
      }
    }
  }
`;

const allMenus = gql`
  {
    menus(where: { activo: true }, orderBy: id_ASC) {
      id
      nombre
    }
  }
`;

const allProductos = gql`
  {
    productos: productoes(where: { activo: true }, orderBy: id_ASC) {
      id
      nombre
      valor
    }
  }
`;

const CreateArticulo = gql`
  mutation createArticulo( $data: ArticuloCreateInput! ) {
    createArticulo( data: $data ) {
      id
      nombre
      valor
      tiempo_preparacion
      menu {
        id
        nombre
      }
      articuloDetalle: articulos_detalle {
        id
        cantidad
        producto {
          id
          nombre
          valor
          stock
        }
      }
    }
  }
`;

const DeleteArticulo = gql`
  mutation eliminarArticulo($id: ID!) {
    eliminarArticulo: deleteArticulo(where: { id: $id }) {
      id
      nombre
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
