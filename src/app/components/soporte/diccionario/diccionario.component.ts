import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Diccionario } from 'src/app/entities/diccionario';
import { DiccionarioService } from 'src/app/services/soporte/diccionario.service';
import * as Quill from 'quill';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    templateUrl: './diccionario.component.html'
})
export class DiccionarioComponent implements OnInit {
    cols: any[] = [];
    diccionarios!: Diccionario[];
    v_diccionario!: Diccionario;
    loading: boolean = false;
    agregarDiccionarioDialog: boolean = false;
    verDiccionarioDialog: boolean = false;
    diccionarioEditDialog: boolean = false;
    diccionarioDeleteDialog: boolean = false;
    readonlyDiccionario: boolean = true;
    diccionarioRequest: Diccionario = {} as Diccionario;
    estadoSubmit: string = '';
    idDetele: number = 0;

    labelDialog: string = '';
    editorConfig = {
        toolbar: false,
        readOnly: true,
        theme: 'snow'
    };

    constructor(private service: DiccionarioService, private messageService: MessageService) {
    }

    ngOnInit() {
        (window as any).Quill = Quill;
        this.listar();
    }

    listar() {
        this.loading = true;
        this.service.listar().subscribe({
            next: (res) => {
                this.diccionarios = res.data;
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

    verDiccionario(diccionario: Diccionario, operacion: number) {
        this.loading = true;
        this.labelDialog = operacion == 1 ? 'Ver Detalle Diccionario - ' + diccionario.coderror : 'Editar Diccionario - ' + diccionario.coderror;
        this.estadoSubmit = operacion == 1 ? 'Listo' : 'Guardar';
        this.readonlyDiccionario = operacion == 1 ? true : false;
        this.service.listarUno(diccionario.id).subscribe({
            next: (res) => {
                this.diccionarioRequest = res.data;
                this.verDiccionarioDialog = true;
            },
            complete: () => {
                this.loading = false;
            },
        });
    }

    hideDialogVer() {
        this.verDiccionarioDialog = false;
    }

    submitEditarDiccionario(diccionarioRequest: Diccionario, operacion: number) {
        this.loading = true;
        this.estadoSubmit = 'Guardando...';
        this.service.editarUno(diccionarioRequest.id, diccionarioRequest).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exito',
                    detail: res.message
                });
                this.estadoSubmit = 'Guardar';
                this.loading = false;
                this.actualizarTabla();
                this.hideDialogVer();
            },
            error: (error: HttpErrorResponse) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ocurrio un error',
                    detail: error.error.message
                });
                this.estadoSubmit = 'Guardar';
                this.loading = false;
            }
        });
    }

    agregarDiccionario() {
        this.labelDialog = 'Agregar Diccionario';
        this.estadoSubmit = 'Guardar';
        this.readonlyDiccionario = false;
        this.diccionarioRequest = {} as Diccionario;
        this.agregarDiccionarioDialog = true;
    }

    hideDialogAgregar() {
        this.agregarDiccionarioDialog = false;
    }

    submitAgregarDiccionario(diccionarioRequest: Diccionario) {
        this.loading = true;
        this.estadoSubmit = 'Guardando...';
        this.service.crearUno(diccionarioRequest).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exito',
                    detail: res.message
                });
                this.estadoSubmit = 'Guardar';
                this.loading = false;
                this.actualizarTabla();
                this.hideDialogAgregar();
            },
            error: (error: HttpErrorResponse) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ocurrio un error',
                    detail: error.error.message
                });
                this.estadoSubmit = 'Guardar';
                this.loading = false;
            }
        });
    }

    eliminarDiccionario(diccionario: Diccionario) {
        this.diccionarioDeleteDialog = true;
        this.estadoSubmit = 'Eliminar';
        this.labelDialog = 'Eliminar Diccionario - ' + diccionario.coderror;
        this.idDetele = diccionario.id;
    }

    hideDialogEliminar() {
        this.diccionarioDeleteDialog = false;
    }

    eliminarDiccionarioSubmit(id: number) {
        this.loading = true;
        this.estadoSubmit = 'Procesando...';
        this.service.eliminarUno(id).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exito',
                    detail: res.message
                });
                this.estadoSubmit = 'Eliminar';
                this.loading = false;
                this.actualizarTabla();
                this.hideDialogAgregar();
            },
            error: (error: HttpErrorResponse) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ocurrio un error',
                    detail: error.error.message
                });
                this.estadoSubmit = 'Eliminar';
                this.loading = false;
            }
        });
    }

}
