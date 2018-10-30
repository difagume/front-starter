import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { ArticuloCreateInput, ArticuloUpdateInput, ProductoCreateInput } from '../generated/graphql';
import { CrearProducto } from '../graphql/graphql';

@Injectable(/* {
  providedIn: PagesModule
} */)
export class CatalogoService {

  constructor(private apollo: Apollo) { }

  allProductos() {
    return this.apollo.watchQuery({ query: allProductos });
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

  eliminarArticulo(articulo: any) {
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

  eliminarArticuloDetalles(idArticulo) {
    return this.apollo.mutate({
      mutation: DeleteManyArticulo_detalles,
      variables: {
        id: idArticulo
      }
    });
  }

  actualizarArticulo(articulo: ArticuloUpdateInput, id) {
    return this.apollo.mutate({
      mutation: UpdateArticulo,
      variables: {
        data: articulo,
        id: id
      }
    });
  }

  crearProducto(producto: ProductoCreateInput) {
    return this.apollo.mutate({
      mutation: CrearProducto,
      variables: {
        data: producto
      },
      update: (store, { data: { createProducto } }) => {
        const data: any = store.readQuery({ query: allProductos });
        data.productos.push(createProducto);
        store.writeQuery({ query: allProductos, data });
      },
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

const DeleteManyArticulo_detalles = gql`
  mutation deleteManyArticulo_detalles($id: ID!) {
    eliminarArticuloDetalles: deleteManyArticulo_detalles(where: { articulo: { id: $id } }) {
      count
    }
  }
`;

const UpdateArticulo = gql`
  mutation updateArticulo($data: ArticuloUpdateInput!, $id: ID!) {
    updateArticulo(data: $data, where: { id: $id }) {
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
