import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Logger } from '..';

declare let swal: any;
const log = new Logger('ErrorInterceptor');

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // extract error message from http body if an error occurs
        return next.handle(request).catch(errorResponse => {
            log.debug(errorResponse.error);

            if (!navigator.onLine) {
                // Handle offline error
                swal('Aviso', 'No tiene conexión de Internet', 'error');
            } else {
                if (errorResponse.error.error) {
                    swal(errorResponse.error.error.name, errorResponse.error.error.message, 'error');
                } else {
                    swal(errorResponse.error.name, errorResponse.error.message, 'error');
                }
            }

            return Observable.throw(errorResponse.error);
        });
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
