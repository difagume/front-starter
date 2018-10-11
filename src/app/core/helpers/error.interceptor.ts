
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService, Logger } from '..';

declare let swal: any;
const log = new Logger('ErrorInterceptor');

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private injector: Injector
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // extract error message from http body if an error occurs
        return next.handle(request).pipe(catchError(errorResponse => {

            log.debug(errorResponse);

            if (errorResponse instanceof HttpErrorResponse) {
                // Server or connection error happened
                if (!navigator.onLine) {
                    console.log('-- 1 --');
                    // Handle offline error
                    swal('Aviso 😮', 'No tiene conexión de Internet', 'error');
                    // return observableThrowError(errorResponse.error);
                } else {
                    // Handle Http Error (error.status === 403, 404...)
                    if (errorResponse.error.sesionCaducada) {
                        console.log('-- 2 --');
                        swal(errorResponse.error.error.name, errorResponse.error.error.message, 'error');
                        this.logout();
                    } else if (errorResponse.error.error) {
                        console.log('-- 3 --');
                        swal(errorResponse.error.error.name, errorResponse.error.error.message, 'error');
                    } else if (errorResponse.error.name) {
                        console.log('-- 4 --');
                        swal(errorResponse.error.name, errorResponse.error.message, 'error');
                    } else {
                        console.log('-- 5 --');
                        swal('Aviso 😮', 'No tiene conexión al servidor', 'error');
                    }
                    return observableThrowError(errorResponse.error);
                }
            } else {
                console.log('-- 6 --');
                // Handle Client Error (Angular Error, ReferenceError...)
                console.log('Handle Client Error (Angular Error, ReferenceError...)');
            }
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

