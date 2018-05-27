import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Logger } from '../logger.service';
import { AuthenticationService } from './authentication.service';

const log = new Logger('AuthenticationGuard');

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private permissionsService: NgxPermissionsService) { }

  canActivate(): boolean {
    if (this.authenticationService.isAuthenticated()) {
      log.info('Autenticado 😏');
      // Cargando roles
      const permisos = this.authenticationService.roles.split(',');
      this.permissionsService.loadPermissions(permisos);
      log.info('🔑', this.permissionsService.getPermissions());

      /* this.permissionsService.hasPermission('DESA')
        .then(t => {
          log.info('tiene: ', t);
        }); */

      return true;
    }

    log.debug('No autenticado 😨, redireccionando...');
    this.router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

}
