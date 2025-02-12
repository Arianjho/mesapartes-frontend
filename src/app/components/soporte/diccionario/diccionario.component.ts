import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Diccionario } from 'src/app/entities/diccionario';
import { DiccionarioService } from 'src/app/services/soporte/diccionario.service';
import * as Quill from 'quill';

@Component({
    templateUrl: './diccionario.component.html'
})
export class DiccionarioComponent implements OnInit {
    cols: any[] = [];
    diccionarios!: Diccionario[];
    v_diccionario!: Diccionario;
    loading: boolean = false;
    verDiccionarioDialog: boolean = false;
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

    verDiccionario(diccionario: Diccionario) {
        this.loading = true;
        this.labelDialog = 'Ver Detalle Diccionario - ' + diccionario.coderror;
        this.service.listarUno(diccionario.id).subscribe({
            next: (res) => {
                this.v_diccionario = res.data;
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

}
