import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditarIncidenciaRequest, Incidencia, IncidenciaRevisadaResponse } from 'src/app/entities/incidencias';
import { GeneralResponse } from 'src/app/entities/response';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IncidenciasService {

    constructor(private http: HttpClient) { }

    listar(fechaInicio: string, fechaFin: string, codErrors: string, revisado: string): Observable<GeneralResponse<Incidencia[]>> {
        return this.http.get<GeneralResponse<Incidencia[]>>(`${environment.api_url}/incidencia?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&coderror=${codErrors}&revisado=${revisado}`);
    }

    listarUno(id: number): Observable<GeneralResponse<Incidencia>> {
        return this.http.get<GeneralResponse<Incidencia>>(`${environment.api_url}/incidencia/${id}`);
    }

    editarMasivo(request: EditarIncidenciaRequest[]): Observable<GeneralResponse<IncidenciaRevisadaResponse[]>> {
        return this.http.put<GeneralResponse<IncidenciaRevisadaResponse[]>>(`${environment.api_url}/incidencia/masivo`, request);
    }

    importarCSV(file: File): Observable<GeneralResponse<string>> {
        const formData = new FormData();
        formData.append('archivo', file);

        return this.http.post<GeneralResponse<string>>(
            `${environment.api_url}/incidencia/importar`,
            formData
        );
    }
}
