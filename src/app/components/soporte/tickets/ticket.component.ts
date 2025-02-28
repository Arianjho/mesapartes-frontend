import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Ticket } from 'src/app/entities/ticket';
import * as Quill from 'quill';
import { HttpErrorResponse } from '@angular/common/http';
import { TicketsService } from 'src/app/services/soporte/tickets.service';

@Component({
    templateUrl: './ticket.component.html'
})
export class TicketComponent implements OnInit {
    tickets!: Ticket[];
    cols: any[] = [];
    ticketRequest: Ticket = {} as Ticket;
    loading: boolean = false;
    verTicketDialog: boolean = false;
    readonlyTicket: boolean = true;
    estadoSubmit: string = '';
    labelDialog: string = '';

    editorConfig = {
        toolbar: false,
        readOnly: true,
        theme: 'snow'
    };

    constructor(private service: TicketsService, private messageService: MessageService) { }

    ngOnInit() {
        (window as any).Quill = Quill;
        this.listar();
    }

    listar() {
        this.loading = true;
        this.service.listar().subscribe({
            next: (res) => {
                this.tickets = res.data;
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    actualizarTabla() {
        this.listar();
    }

    onGlobalFilter(dt: any, event: any) {
        dt.filterGlobal(event.target.value, 'contains');
    }

    verTicket(ticket: Ticket, operacion: number) {
        this.loading = true;
        this.labelDialog = operacion == 1 ? 'Ver Ticket' : 'Editar Ticket';
        this.estadoSubmit = operacion == 1 ? 'Cerrar' : 'Guardar';
        this.readonlyTicket = operacion == 1;
        this.service.listarUno(ticket.id).subscribe({
            next: (res) => {
                this.ticketRequest = res.data;
                this.verTicketDialog = true;
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    hideDialogVer() {
        this.verTicketDialog = false;
    }

    submitEditarTicket(ticketRequest: Ticket) {
        this.loading = true;
        this.estadoSubmit = 'Guardando...';
        this.service.editarUno(ticketRequest.id, ticketRequest).subscribe({
            next: (res) => {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: res.message });
                this.loading = false;
                this.actualizarTabla();
                this.hideDialogVer();
            },
            error: (error: HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
                this.loading = false;
            }
        });
    }

    agregarTicket() {
        this.labelDialog = 'Agregar Ticket';
        this.estadoSubmit = 'Guardar';
        this.readonlyTicket = false;
        this.ticketRequest = {} as Ticket;
        this.verTicketDialog = true;
    }
}
