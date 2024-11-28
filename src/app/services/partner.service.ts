import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../entities/response';
import { Partner } from '../entities/partner';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

    constructor(private http: HttpClient) { }

    listar(): Observable<GeneralResponse<Partner[]>> {
        return this.http.get<GeneralResponse<[]>>(`${environment.api_url}/partner`);
    }

    listarUno(id: number): Observable<GeneralResponse<Partner>> {
        return this.http.get<GeneralResponse<Partner>>(`${environment.api_url}/partner/${id}`);
    }

    crearUno(partner: Partner): Observable<GeneralResponse<Partner>> {
        return this.http.post<GeneralResponse<Partner>>(`${environment.api_url}/partner`, partner);
    }

    editarUno(id: number, partner: Partner): Observable<GeneralResponse<Partner>> {
        return this.http.put<GeneralResponse<Partner>>(`${environment.api_url}/partner/${id}`, partner);
    }

    eliminarUno(id: number): Observable<GeneralResponse<Partner>> {
        return this.http.delete<GeneralResponse<Partner>>(`${environment.api_url}/partner/${id}`);
    }
}
