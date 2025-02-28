import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/entities/response';
import { environment } from 'src/environments/environment';
import { Ticket } from 'src/app/entities/ticket';

@Injectable({
    providedIn: 'root'
})
export class TicketsService {

    private apiUrl = `${environment.api_url}/ticket`;

    constructor(private http: HttpClient) { }

    listar(): Observable<GeneralResponse<Ticket[]>> {
        return this.http.get<GeneralResponse<Ticket[]>>(`${this.apiUrl}`);
    }

    listarUno(id: number): Observable<GeneralResponse<Ticket>> {
        return this.http.get<GeneralResponse<Ticket>>(`${this.apiUrl}/${id}`);
    }

    crearUno(ticket: Ticket): Observable<GeneralResponse<Ticket>> {
        const payload = {
            ...ticket,
            usuario: { id: ticket.usuario.id },
            empresa: { id: ticket.empresa.id }
        };
        return this.http.post<GeneralResponse<Ticket>>(`${this.apiUrl}`, payload);
    }

    editarUno(id: number, ticket: Ticket): Observable<GeneralResponse<Ticket>> {
        const payload = {
            ...ticket,
            usuario: { id: ticket.usuario.id },
            empresa: { id: ticket.empresa.id }
        };
        return this.http.put<GeneralResponse<Ticket>>(`${this.apiUrl}/${id}`, payload);
    }

    eliminarUno(id: number): Observable<GeneralResponse<Ticket>> {
        return this.http.delete<GeneralResponse<Ticket>>(`${this.apiUrl}/${id}`);
    }
}
