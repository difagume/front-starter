import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../config';
import { AuthenticationService, Logger } from '../core';
import { UsuariosCreateInput } from '../generated/graphql';
import { Singup } from '../graphql/graphql';
import { Usuario } from '../models';

const log = new Logger('UsuarioService');

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService,
    private apollo: Apollo) { }

  actualizarUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario/${usuario.id}?token=${this.authenticationService.credentials.token}`;
    return this.http.put(url, usuario);
  }

  /* registrarUsuario(usuario: UsuariosCreateInput) {
    const url = `${URL_SERVICIOS}/usuario/registrar`;
    return this.http.post(url, usuario);
  } */

  signup(usuario: UsuariosCreateInput) {
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
        const data: any = store.readQuery({ query: allArticulos });
        data.articulos.push(signup);
        store.writeQuery({ query: allArticulos, data });
      }, */
    });
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario/eliminar/${usuario.id}?token=${this.authenticationService.credentials.token}`;
    return this.http.put(url, usuario);
  }

  obtenerUsuarios() {
    const url = `${URL_SERVICIOS}/usuario`;
    return this.http.get(url)
      .pipe(map((res: any) => {
        return res.usuarios;
      }));
  }

  get usuarioLogueadoId(): string | null {
    return this.authenticationService.credentials.id;
  }

}
