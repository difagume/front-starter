import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config';
import { AuthenticationService, Logger } from '../core';
import { Usuario } from '../models';

const log = new Logger('UsuarioService');

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  actualizarUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario/${usuario.id}?token=${this.authenticationService.credentials.token}`;
    return this.http.put(url, usuario);
  }

  registrarUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario/registrar`;
    return this.http.post(url, usuario);
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario/eliminar/${usuario.id}?token=${this.authenticationService.credentials.token}`;
    return this.http.put(url, usuario);
  }

  obtenerUsuarios() {
    const url = `${URL_SERVICIOS}/usuario`;
    return this.http.get(url)
      .map((res: any) => {
        return res.usuarios;
      });
  }

  get usuarioLogueadoId(): string | null {
    return this.authenticationService.credentials.id;
  }

}
