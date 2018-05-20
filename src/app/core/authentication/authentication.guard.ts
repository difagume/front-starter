import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Logger } from '../logger.service';
import { AuthenticationService } from './authentication.service';

const log = new Logger('AuthenticationGuard');

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  canActivate(): boolean {
    if (this.authenticationService.isAuthenticated()) {
      log.info('Autenticado 😏');
      return true;
    }
    /* if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }
 */
    log.debug('No autenticado 😨, redireccionando...');
    this.router.navigate(['/authentication/login'], { replaceUrl: true });
    return false;
  }

}
