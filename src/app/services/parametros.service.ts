import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../core';
import { Rol } from '../generated/graphql';
import { roles } from '../graphql/graphql';

@Injectable(/* {
  providedIn: PagesModule
} */)
export class ParametrosService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService,
    private apollo: Apollo) { }

  actualizarRol(rol: Rol) {
    const url = `${environment.URL_HTTP}/rol/${rol.id}?token=${this.authenticationService.credentials.token}`;
    return this.http.put(url, rol);
  }

  crearRol(rol: Rol) {
    const url = `${environment.URL_HTTP}/rol?token=${this.authenticationService.credentials.token}`;
    return this.http.post(url, rol);
  }

  eliminarRol(rol: Rol) {
    const url = `${environment.URL_HTTP}/rol/eliminar/${rol.id}?token=${this.authenticationService.credentials.token}`;
    return this.http.put(url, rol);
  }

  obtenerRoles() {
    return this.apollo.watchQuery({ query: roles });
  }

}
