import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Logger } from '../core';

const log = new Logger('PedidoService');

@Injectable()
export class PedidoService {

  allMenusArticulosQuery: QueryRef<any>;

  constructor(private apollo: Apollo) { }

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
