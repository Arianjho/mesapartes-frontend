import { inject, Injectable } from '@angular/core';
import { LoginRequest, Usuario } from '../entities/usuarios';
import { HttpClient } from '@angular/common/http';
import { GeneralResponse } from '../entities/response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    constructor(private http: HttpClient) { }

    private router = inject(Router);

    login(loginRequest: LoginRequest): Observable<GeneralResponse<Usuario>> {
        return this.http.post<GeneralResponse<Usuario>>(`${environment.api_url}/auth/login`, loginRequest);
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }

    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
    }
}
