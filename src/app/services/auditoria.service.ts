import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../entities/response';
import { Auditoria } from '../entities/auditoria';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuditoriaService {

    constructor(private http: HttpClient) { }

    listar(): Observable<GeneralResponse<Auditoria[]>> {
        return this.http.get<GeneralResponse<[]>>(`${environment.api_url}/auditoria`);
    }
}
