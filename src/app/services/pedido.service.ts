import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Logger } from '../core';
import { MenusArticulos } from '../graphql/graphql';

const log = new Logger('PedidoService');

@Injectable()
export class PedidoService {

  allMenusArticulosQuery: QueryRef<any>;

  constructor(private apollo: Apollo) { }

  obtenerMenusArticulos() {
    this.allMenusArticulosQuery = this.apollo.watchQuery({ query: MenusArticulos });
    return this.allMenusArticulosQuery;
  }

  /*  subscribeToSignup() {
     this.allUsuariosQuery.subscribeToMore({
       document: SingupSubscription,
       updateQuery: (previous, { subscriptionData }) => {

         if (!subscriptionData.data) {
           return previous;
         }

         const nuevoUsuario = [
           subscriptionData.data.usuarios,
           ...previous.usuarios
         ];
         return {
           ...previous,
           usuarios: nuevoUsuario
         };
       }
     });
   } */

}
