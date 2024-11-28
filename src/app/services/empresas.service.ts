import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../entities/response';
import { Empresa } from '../entities/empresa';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmpresasService {

    constructor(private http: HttpClient) { }

    listar(): Observable<GeneralResponse<Empresa[]>> {
        return this.http.get<GeneralResponse<[]>>(`${environment.api_url}/empresa`);
    }

    listarUno(id: number): Observable<GeneralResponse<Empresa>> {
        return this.http.get<GeneralResponse<Empresa>>(`${environment.api_url}/empresa/${id}`);
    }

    crearUno(empresa: Empresa): Observable<GeneralResponse<Empresa>> {
        return this.http.post<GeneralResponse<Empresa>>(`${environment.api_url}/empresa`, empresa);
    }

    editarUno(id: number, empresa: Empresa): Observable<GeneralResponse<Empresa>> {
        return this.http.put<GeneralResponse<Empresa>>(`${environment.api_url}/empresa/${id}`, empresa);
    }

    eliminarUno(id: number): Observable<GeneralResponse<Empresa>> {
        return this.http.delete<GeneralResponse<Empresa>>(`${environment.api_url}/empresa/${id}`);
    }
}
