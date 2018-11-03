import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { AuthenticationService, Logger } from '../core';
import { RolCreateInput, UsuarioCreateInput, UsuarioUpdateInput } from '../generated/graphql';
import { ActualizarUsuario, CrearRol, DeleteUsuario, roles, Singup, SingupSubscription, usuarios } from '../graphql/graphql';

const log = new Logger('UsuarioService');

@Injectable()
export class UsuarioService {

  allUsuariosQuery: QueryRef<any>;

  constructor(private authenticationService: AuthenticationService,
    private apollo: Apollo) { }

  /*   actualizarUsuario(usuario: Usuario) {
      const url = `${URL_SERVICIOS}/usuario/${usuario.id}?token=${this.authenticationService.credentials.token}`;
      return this.http.put(url, usuario);
    } */

  actualizarUsuario(usuario: UsuarioUpdateInput, id) {
    return this.apollo.mutate({
      mutation: ActualizarUsuario,
      variables: {
        data: usuario,
        id: id
      }
    });
  }

  // Agrega un usuario
  signup(usuario: UsuarioCreateInput) {
    return this.apollo.mutate({
      mutation: Singup,
      variables: {
        usuario: usuario.usuario,
        email: usuario.email,
        password: usuario.password,
        nombre: usuario.nombre,
        apellido: usuario.apellido
      },
      /* update: (store, { data: { signup } }) => {
        const data: any = store.readQuery({ query: usuarios });
        data.articulos.push(signup);
        store.writeQuery({ query: usuarios, data });
      }, */
    });
  }

  /* eliminarUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario/eliminar/${usuario.id}?token=${this.authenticationService.credentials.token}`;
    return this.http.put(url, usuario);
  } */

  eliminarUsuario(usuario: any) {
    return this.apollo.mutate({
      mutation: DeleteUsuario,
      variables: {
        id: usuario.id
      },
      update: (store, { data: { eliminarUsuario } }) => {
        const data: any = store.readQuery({ query: usuarios });
        const indice = data.usuarios.map(usu => usu.id).indexOf(eliminarUsuario.id);
        data.usuarios.splice(indice, 1);
        store.writeQuery({ query: usuarios, data });
      },
    });
  }

  obtenerUsuarios() {
    this.allUsuariosQuery = this.apollo.watchQuery({ query: usuarios });
    return this.allUsuariosQuery;
  }

  get usuarioLogueadoId(): string | null {
    return this.authenticationService.credentials.id;
  }

  subscribeToSignup() {
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
  }

  crearRol(rol: RolCreateInput) {
    return this.apollo.mutate({
      mutation: CrearRol,
      variables: {
        data: rol
      },
      update: (store, { data: { createRol } }) => {
        const data: any = store.readQuery({ query: roles });
        data.roles.push(createRol);
        store.writeQuery({ query: roles, data });
      },
    });
  }

}
