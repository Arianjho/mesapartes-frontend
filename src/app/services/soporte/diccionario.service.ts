import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diccionario } from 'src/app/entities/diccionario';
import { GeneralResponse } from 'src/app/entities/response';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DiccionarioService {

    constructor(private http: HttpClient) { }

    listar(): Observable<GeneralResponse<Diccionario[]>> {
        return this.http.get<GeneralResponse<[]>>(`${environment.api_url}/diccionario`);
    }

    listarUno(id: number): Observable<GeneralResponse<Diccionario>> {
        return this.http.get<GeneralResponse<Diccionario>>(`${environment.api_url}/diccionario/${id}`);
    }

    crearUno(diccionario: Diccionario): Observable<GeneralResponse<Diccionario>> {
        return this.http.post<GeneralResponse<Diccionario>>(`${environment.api_url}/diccionario`, diccionario);
    }

    editarUno(id: number, diccionario: Diccionario): Observable<GeneralResponse<Diccionario>> {
        return this.http.put<GeneralResponse<Diccionario>>(`${environment.api_url}/diccionario/${id}`, diccionario);
    }

    eliminarUno(id: number): Observable<GeneralResponse<Diccionario>> {
        return this.http.delete<GeneralResponse<Diccionario>>(`${environment.api_url}/diccionario/${id}`);
    }
}
