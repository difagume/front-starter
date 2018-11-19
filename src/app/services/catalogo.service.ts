import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ArticuloCreateInput, ArticuloUpdateInput, MenuCreateInput, ProductoCreateInput } from '../generated/graphql';
import {
  AllMenus, AllProductos, articulos, CrearMenu, CrearProducto,
  CreateArticulo, DeleteArticulo, UpdateArticulo
} from '../graphql/graphql';

@Injectable(/* {
  providedIn: PagesModule
} */)
export class CatalogoService {

  constructor(private apollo: Apollo) { }

  allArticulos() {
    return this.apollo.watchQuery({ query: articulos });
  }

  allProductos() {
    return this.apollo.watchQuery({ query: AllProductos });
  }

  allMenus() {
    return this.apollo.watchQuery({ query: AllMenus });
  }

  crearArticulo(articulo: ArticuloCreateInput) {
    return this.apollo.mutate({
      mutation: CreateArticulo,
      variables: {
        data: articulo
      },
      update: (store, { data: { createArticulo } }) => {
        // Read the data from our cache for this query.
        const data: any = store.readQuery({ query: articulos });
        // Add our comment from the mutation to the end.
        data.articulos.push(createArticulo);
        // Write our data back to the cache.
        store.writeQuery({ query: articulos, data });
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
        const data: any = store.readQuery({ query: articulos });
        const indice = data.articulos.map(art => art.id).indexOf(eliminarArticulo.id);
        data.articulos.splice(indice, 1);
        store.writeQuery({ query: articulos, data });
      },
    });
  }

  /* eliminarArticuloDetalles(idArticulo) {
    return this.apollo.mutate({
      mutation: DeleteManyArticulo_detalles,
      variables: {
        id: idArticulo
      }
    });
  } */

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
        const data: any = store.readQuery({ query: AllProductos });
        data.productos.push(createProducto);
        store.writeQuery({ query: AllProductos, data });
      },
    });
  }

  crearMenu(menu: MenuCreateInput) {
    return this.apollo.mutate({
      mutation: CrearMenu,
      variables: {
        data: menu
      },
      update: (store, { data: { createMenu } }) => {
        const data: any = store.readQuery({ query: AllMenus });
        data.menus.push(createMenu);
        store.writeQuery({ query: AllMenus, data });
      },
    });
  }
}
