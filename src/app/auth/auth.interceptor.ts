import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private messageService: MessageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/auth/login')) {
            return next.handle(req);
        }

        const token = localStorage.getItem('token');

        if (!token) {
            localStorage.removeItem('token');
            this.router.navigate(['/auth/login']);
            return throwError(() => new Error('Token not found, redirecting to login.'));
        }

        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ProgressEvent) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error de Conexión',
                        detail: 'No se pudo conectar con el servidor. Verifique su conexión.'
                    });
                } else {
                    if (error.status === 403 || error.status === 401) {
                        this.messageService.add({ severity: 'error', summary: 'Acceso Denegado', detail: 'Sesión expirada. Por favor inicie sesión nuevamente.' });
                        localStorage.removeItem('token');
                        this.router.navigate(['/auth/login']);
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error inesperado. Inténtelo más tarde.' });
                    }
                }
                return throwError(() => error);
            })
        );
    }
}
