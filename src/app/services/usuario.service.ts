import { Injectable } from '@angular/core';
import { Usuario } from '../models';
import { HttpClient } from '@angular/common/http';
import { Logger } from '../core';
import { URL_SERVICIOS } from '../config';

const log = new Logger('UsuarioService');

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) { }

  actualizarUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario/${usuario.id}?token=${usuario.token}`;
    return this.http.put(url, usuario);
  }

  registrarUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario/registrar`;
    return this.http.post(url, usuario);
  }

  obtenerUsuarios() {
    const url = `${URL_SERVICIOS}/usuario`;
    return this.http.get(url)
      .map((res: any) => {
        return res.usuarios;
      });
  }
}
