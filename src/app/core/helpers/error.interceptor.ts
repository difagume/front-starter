
import { throwError as observableThrowError, Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { AuthenticationService, Logger } from '..';

declare let swal: any;
const log = new Logger('ErrorInterceptor');

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // extract error message from http body if an error occurs
        return next.handle(request).pipe(catchError(errorResponse => {
            log.debug(errorResponse.error);

            if (!navigator.onLine) {
                // Handle offline error
                swal('Aviso', 'No tiene conexión de Internet', 'error');
            } else {
                if (errorResponse.error.sesionCaducada) {
                    swal(errorResponse.error.error.name, errorResponse.error.error.message, 'error');
                    this.logout();
                } else
                    if (errorResponse.error.error) {
                        swal(errorResponse.error.error.name, errorResponse.error.error.message, 'error');
                    } else {
                        swal(errorResponse.error.name, errorResponse.error.message, 'error');
                    }
            }

            return observableThrowError(errorResponse.error);
        }));
    }

    logout() {
        this.authenticationService.logout()
            .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};

