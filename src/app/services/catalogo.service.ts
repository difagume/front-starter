import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../config';

@Injectable(/* {
  providedIn: PagesModule
} */)
export class CatalogoService {

  constructor(private http: HttpClient) { }

  obtenerProductos() {
    const url = `${URL_SERVICIOS}/producto`;
    return this.http.get(url)
      .pipe(map((res: any) => {
        res.productos.forEach(p => {
          p.cantidad = 1;
        });
        return res.productos;
      }));
  }
}
