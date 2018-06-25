import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../config';
import { AuthenticationService } from '../core';
import { Articulo } from '../models';

@Injectable(/* {
  providedIn: PagesModule
} */)
export class CatalogoService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  obtenerProductos() {
    const url = `${URL_SERVICIOS}/catalogo/productos`;
    return this.http.get(url)
      .pipe(map((res: any) => {
        res.productos.forEach(p => {
          p.cantidad = 1;
        });
        return res.productos;
      }));
  }

  obtenerMenu() {
    const url = `${URL_SERVICIOS}/catalogo/menu`;
    return this.http.get(url)
      .pipe(map((res: any) => {
        return res.menu;
      }));
  }

  crearArticulo(articulo: Articulo) {
    const url = `${URL_SERVICIOS}/catalogo/articulo?token=${this.authenticationService.credentials.token}`;
    return this.http.post(url, articulo);
  }
}
