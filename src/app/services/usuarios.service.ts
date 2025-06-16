import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { LoginRequest, Usuario, UsuarioPasswordRequest, UsuarioUpdateRequest } from '../entities/usuarios';
import { GeneralResponse } from '../entities/response';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    private readonly apiUrl = `${environment.api_url}/auth`;

    constructor(private http: HttpClient) { }

    private router = inject(Router);

    getAll(): Observable<GeneralResponse<Usuario[]>> {
        return this.http.get<GeneralResponse<Usuario[]>>(`${this.apiUrl}`);
    }

    getById(id: number): Observable<GeneralResponse<Usuario>> {
        return this.http.get<GeneralResponse<Usuario>>(`${this.apiUrl}/${id}`);
    }

    // register(request: RegisterRequest): Observable<GeneralResponse<Usuario>> {
    //     return this.http.post<GeneralResponse<Usuario>>(`${this.apiUrl}/register`, request);
    // }

    login(loginRequest: LoginRequest): Observable<GeneralResponse<Usuario>> {
        return this.http.post<GeneralResponse<Usuario>>(`${this.apiUrl}/login`, loginRequest);
    }

    updateUsuario(id: number, updateRequest: UsuarioUpdateRequest): Observable<GeneralResponse<Usuario>> {
        return this.http.put<GeneralResponse<Usuario>>(`${this.apiUrl}/update/${id}`, updateRequest);
    }

    updatePassword(id: number, passwordRequest: UsuarioPasswordRequest): Observable<GeneralResponse<Usuario>> {
        return this.http.put<GeneralResponse<Usuario>>(`${this.apiUrl}/update/password/${id}`, passwordRequest);
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
