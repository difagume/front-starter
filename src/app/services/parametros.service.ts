import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../config';
import { AuthenticationService } from '../core';
import { Rol } from '../models';

@Injectable(/* {
  providedIn: PagesModule
} */)
export class ParametrosService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  actualizarRol(rol: Rol) {
    const url = `${URL_SERVICIOS}/rol/${rol.id}?token=${this.authenticationService.credentials.token}`;
    return this.http.put(url, rol);
  }

  crearRol(rol: Rol) {
    const url = `${URL_SERVICIOS}/rol?token=${this.authenticationService.credentials.token}`;
    return this.http.post(url, rol);
  }

  eliminarRol(rol: Rol) {
    const url = `${URL_SERVICIOS}/rol/eliminar/${rol.id}?token=${this.authenticationService.credentials.token}`;
    return this.http.put(url, rol);
  }

  obtenerRoles() {
    const url = `${URL_SERVICIOS}/rol`;
    return this.http.get(url)
      .pipe(map((res: any) => {
        return res.roles;
      }));
  }

}
