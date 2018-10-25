
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../../graphql/graphql';
import { Logger } from '../logger.service';

const log = new Logger('AuthenticationService');

export interface Credentials {
  // Customize received credentials here
  id: string;
  usuario: string;
  password: string;
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  img: string;
  social: boolean;
  token: string;
}

export interface LoginContext {
  usuario: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  private _credentials: Credentials | null;

  constructor(private http: HttpClient,
    private ngxPermissionsService: NgxPermissionsService,
    private apollo: Apollo) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return this.apollo.watchQuery({
      query: Login,
      variables: {
        usuario: context.usuario,
        password: context.password
      }
    }).valueChanges.pipe(
      map(({ data }) => {
        this.setCredentials({ ...data['login'].user, token: data['login'].token }, context.remember);
        return data['login'].user;
      }));
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    // ngx-permissions
    this.ngxPermissionsService.flushPermissions();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  get roles(): string | null {
    return this._credentials.rol;
  }

  actualizarCredentials(credentials: Credentials) {
    this._credentials = credentials || null;

    if (credentials) {
      if (localStorage.getItem('credentials')) {
        localStorage.setItem(credentialsKey, JSON.stringify(credentials));
      }
      if (sessionStorage.getItem('credentials')) {
        sessionStorage.setItem(credentialsKey, JSON.stringify(credentials));
      }
    }
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

}
