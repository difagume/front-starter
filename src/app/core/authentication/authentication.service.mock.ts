/* import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Credentials, LoginContext } from './authentication.service';

export class MockAuthenticationService {

  credentials: Credentials | null = {
    id: null,
    usuario: 'test',
    password: null,
    email: null,
    nombre: null,
    apellido: null,
    rol: null,
    img: null,
    social: false,
    token: '123456'
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      id: null,
      usuario: context.usuario,
      password: null,
      email: null,
      nombre: null,
      apellido: null,
      rol: null,
      img: null,
      social: false,
      token: '123456'
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

}
 */
