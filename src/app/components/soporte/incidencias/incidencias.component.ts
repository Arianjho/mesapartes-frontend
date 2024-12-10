import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EditarIncidencia, EditarIncidenciaRequest, Incidencia } from 'src/app/entities/incidencias';
import { IncidenciasService } from 'src/app/services/soporte/incidencias.service';
import { Filtros, OptionsNumber, OptionsString } from './types/filtros';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    templateUrl: './incidencias.component.html'
})
export class IncidenciasComponent implements OnInit {

    selectedIncidencias: Incidencia[] = [];
    submitted: boolean = false;
    submitFiltros: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    incidencias: Incidencia[];
    incidencia: Incidencia;
    filtrosDialog: boolean = false;
    loading: boolean = false;

    private filtros: Filtros = {
        codErrors: '',
        fechaInicio: '',
        fechaFin: '',
        estados: ''
    }

    private codErrors: OptionsString[] = [
        { name: 'NULL', code: 'NULL' },
        { name: '98', code: '98' },
        { name: '400', code: '400' },
        { name: '3444', code: '3444' },
        { name: '3443', code: '3443' },
        { name: '3378', code: '3378' },
        { name: '3367', code: '3367' },
        { name: '3359', code: '3359' },
        { name: '3350', code: '3350' },
        { name: '3348', code: '3348' },
        { name: '3321', code: '3321' },
        { name: '3319', code: '3319' },
        { name: '3294', code: '3294' },
        { name: '3292', code: '3292' },
        { name: '3286', code: '3286' },
        { name: '3283', code: '3283' },
        { name: '3280', code: '3280' },
        { name: '3278', code: '3278' },
        { name: '3277', code: '3277' },
        { name: '3276', code: '3276' },
        { name: '3275', code: '3275' },
        { name: '3272', code: '3272' },
        { name: '3271', code: '3271' },
        { name: '3270', code: '3270' },
        { name: '3267', code: '3267' },
        { name: '3262', code: '3262' },
        { name: '3252', code: '3252' },
        { name: '3250', code: '3250' },
        { name: '3249', code: '3249' },
        { name: '3246', code: '3246' },
        { name: '3245', code: '3245' },
        { name: '3239', code: '3239' },
        { name: '3218', code: '3218' },
        { name: '3207', code: '3207' },
        { name: '3123', code: '3123' },
        { name: '3111', code: '3111' },
        { name: '3105', code: '3105' },
        { name: '306', code: '306' },
        { name: '3031', code: '3031' },
        { name: '3020', code: '3020' },
        { name: '2990', code: '2990' },
        { name: '2989', code: '2989' },
        { name: '2957', code: '2957' },
        { name: '2936', code: '2936' },
        { name: '2892', code: '2892' },
        { name: '2885', code: '2885' },
        { name: '2883', code: '2883' },
        { name: '2802', code: '2802' },
        { name: '2663', code: '2663' },
        { name: '2536', code: '2536' },
        { name: '2521', code: '2521' },
        { name: '2375', code: '2375' },
        { name: '2329', code: '2329' },
        { name: '2326', code: '2326' },
        { name: '2325', code: '2325' },
        { name: '2324', code: '2324' },
        { name: '2323', code: '2323' },
        { name: '2282', code: '2282' },
        { name: '2255', code: '2255' },
        { name: '2223', code: '2223' },
        { name: '2209', code: '2209' },
        { name: '2120', code: '2120' },
        { name: '2119', code: '2119' },
        { name: '2116', code: '2116' },
        { name: '2108', code: '2108' },
        { name: '2105', code: '2105' },
        { name: '2062', code: '2062' },
        { name: '2033', code: '2033' },
        { name: '2027', code: '2027' },
        { name: '2022', code: '2022' },
        { name: '2018', code: '2018' },
        { name: '2017', code: '2017' },
        { name: '2014', code: '2014' },
        { name: '2011', code: '2011' },
        { name: '2010', code: '2010' },
        { name: '200', code: '200' },
        { name: '138', code: '138' },
        { name: '125', code: '125' },
        { name: '111', code: '111' },
        { name: '109', code: '109' },
        { name: '1083', code: '1083' },
        { name: '105', code: '105' },
        { name: '1033', code: '1033' },
        { name: '1032', code: '1032' },
        { name: '102', code: '102' },
        { name: '100', code: '100' }
    ];

    private estados: OptionsNumber[] = [
        { name: 'Registrado', code: 0 },
        { name: 'Revisado', code: 1 },
        { name: 'Pendiente', code: 2 },
    ]

    private estadosEditar: OptionsNumber[] = [
        { name: 'Revisado', code: 1 },
        { name: 'Pendiente', code: 2 },
    ]

    selectedCodErrors: OptionsString[] = this.codErrors;
    selectedEstados: OptionsNumber[] = [
        { name: 'Registrado', code: 0 },
        { name: 'Pendiente', code: 2 },
    ];

    private codErrorsString: string = '';
    private estadosString: string = '';
    verIncidenciaDialog: boolean = false;
    guardarIncidenciaDialog: boolean = false;
    editarIncidenciasDialog: boolean = false;
    estadoSubmit: string = '';
    flagMasivo: boolean = false;
    private editarRequestMasivo: EditarIncidenciaRequest[] = [];
    private editarRequest: EditarIncidencia = {} as EditarIncidencia;

    constructor(private incidenciasService: IncidenciasService, private messageService: MessageService) {
        const now = new Date();
        this.filtros.fechaFin = this.formatDate(now);
        now.setDate(now.getDate() - 30);
        this.filtros.fechaInicio = this.formatDate(now);
    }

    ngOnInit() {
        this.listarIncidencias();
    }

    onGlobalFilter(dt: any, event: any) {
        dt.filterGlobal(event.target.value, 'contains');
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    onDateSelect(event: Date, field: string): void {
        const formattedDate = this.formatDate(event);
        this.filtros[field] = formattedDate;
    }

    openFiltros() {
        this.filtrosDialog = true;
        this.estadoSubmit = 'Aplicar Filtros';
    }

    hideDialogFiltros() {
        this.filtrosDialog = false;
    }

    hideDialogVer() {
        this.verIncidenciaDialog = false;
    }

    hideDialogEditarMasivo() {
        this.selectedIncidencias = [];
        this.editarIncidenciasDialog = false;
    }

    aplicarFiltros() {
        this.estadoSubmit = 'Cargando ...';

        this.filtros.codErrors = this.selectedCodErrors
            .map(error => error.code)
            .join(',');

        this.filtros.estados = this.selectedEstados
            .map(estado => estado.code)
            .join(',');

        if (!this.filtros.fechaInicio || !this.filtros.fechaFin) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debe seleccionar fechas de inicio y fin.',
            });
            return;
        }

        if (this.filtros.codErrors.length === 0 || this.filtros.estados.length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debe seleccionar al menos un error y un estado.',
            });
            return;
        }

        this.listarIncidencias('filtros');
    }

    listarIncidencias(operation: string = '') {
        this.loading = true;
        let execute = (success: boolean) => {
            switch (operation) {
                case 'filtros':
                    if (success) {
                        this.hideDialogFiltros();
                    }
                    this.estadoSubmit = 'Aplicar Filtros';
                    break;

                default:
                    break;
            }
        }

        this.codErrorsString = this.selectedCodErrors
            .map(error => error.code)
            .join(',');

        this.estadosString = this.selectedEstados
            .map(estado => estado.code)
            .join(',');

        this.incidenciasService
            .listar(this.filtros.fechaInicio, this.filtros.fechaFin, this.codErrorsString, this.estadosString)
            .subscribe({
                next: (res) => {
                    this.loading = false;
                    execute(true);
                    const estadoOrden = [0, 2, 1, 3];
                    this.incidencias = res.data.sort((a, b) => {
                        return estadoOrden.indexOf(a.revisado) - estadoOrden.indexOf(b.revisado);
                    });
                },
                error: (error: HttpErrorResponse) => {
                    this.loading = false;
                    this.incidencias = [];
                    execute(false);
                },
            });
    }

    bodyRevisado(value: number): string {
        switch (value) {
            case 0:
                return "<span class='p-tag p-tag-info'> Registrado </span>";
            case 1:
                return "<span class='p-tag p-tag-success'> Solucionado </span>";
            case 2:
                return "<span class='p-tag p-tag-warning'> Pendiente </span>";
            case 3:
                return "<span class='p-tag p-tag-danger'> Inhabilitado </span>";
            default:
                return "Desconocido";
        }
    }

    actualizarTabla() {
        this.listarIncidencias();
    }

    verIncidencia(incidencia: Incidencia) {
        this.loading = true;
        this.incidenciasService.listarUno(incidencia.id).subscribe({
            next: (res) => {
                this.incidencia = res.data;
                this.verIncidenciaDialog = true;
                this.loading = false;
            },
            error: (error: HttpErrorResponse) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ocurrió un error',
                    detail: error.error.message,
                });
            },
        });
    }

    editarMasivoDialog(incidencia: Incidencia) {
        this.flagMasivo = true;

        if (this.selectedIncidencias.length === 1) {
            this.flagMasivo = false;
        }

        this.editarRequest = {
            id: 0,
            detalle: "Documento emitido",
            estado: this.estadosEditar.find(estado => estado.code === 1)
        }

        if (incidencia) {
            this.selectedIncidencias = [incidencia];
            switch (incidencia.coderror) {
                case '2108':
                    if (incidencia.tipodocumento === '01') {
                        this.editarRequest.detalle = "Documento fue enviado después de 3 días de su emisión";
                    } else if (incidencia.tipodocumento === '09') {
                        this.editarRequest.detalle = "Documento fue enviado después de 24h de su emisión";
                    } else if (incidencia.tipodocumento === '07') {
                        this.editarRequest.detalle = "Documento fue enviado después de 7 días de su emisión";
                    }
                    break;
                case '2323':
                    this.editarRequest.detalle = "Documento al que hace referencia ya fue anulado por _baja_";
                    break;
                case '2957':
                    if (incidencia.documento.includes('RA-')) {
                        this.editarRequest.detalle = "Documento intenta anular comprobante del _fecha_, ya superó la fecha límite";
                    }
                    break;
                default:
                    if (incidencia.revisado === 2) {
                        this.editarRequest.detalle = "Documento fue reportado al partner, no se obtuvo respuesta, queda en su posición solucionar el documento";
                    } else {
                        this.editarRequest.detalle = "Documento emitido";
                    }
                    break;
            }
        }

        this.actualizarRequestMasivo();

        this.estadoSubmit = 'Guardar';
        this.editarIncidenciasDialog = true;
    }

    actualizarRequestMasivo() {
        this.editarRequestMasivo = this.selectedIncidencias.map((incidencia) => ({
            id: incidencia.id,
            detalle: this.editarRequest.detalle,
            estado: this.editarRequest.estado.code
        }));
    }

    editarMasivo() {
        this.loading = true;
        this.estadoSubmit = 'Guardando...';

        this.actualizarRequestMasivo();

        this.incidenciasService.editarMasivo(this.editarRequestMasivo).subscribe({
            next: (res) => {
                this.actualizarTabla();
                this.estadoSubmit = 'Guardar';
                this.selectedIncidencias = [];
                this.editarIncidenciasDialog = false;
                this.loading = false;
            },
            error: (error: HttpErrorResponse) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ocurrió un error',
                    detail: error.error.message,
                });
            },
        });
    }

    onFileSelect(event: any, fileUpload: any): void {
        const file = event.files[0];
        if (!file) {
            this.messageService.add({
                severity: 'error',
                summary: 'Archivo no seleccionado',
                detail: 'Por favor seleccione un archivo para continuar.'
            });
            return;
        }

        const validExtensions = ['csv'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!fileExtension || !validExtensions.includes(fileExtension)) {
            this.messageService.add({
                severity: 'error',
                summary: 'Tipo de archivo inválido',
                detail: 'Solo se permiten archivos con extensión .csv.'
            });
            return;
        }

        this.importarCSV(file, fileUpload);
    }

    importarCSV(file: File, fileUpload: any): void {
        this.loading = true;
        this.incidenciasService.importarCSV(file).subscribe({
            next: (res) => {
                this.actualizarTabla();
                this.loading = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Importación exitosa',
                    detail: res.message || 'El archivo se importó correctamente.'
                });

                fileUpload.clear();
            },
            error: (error) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ocurrió un error',
                    detail: error.error.message || 'No se pudo importar el archivo.'
                });

                fileUpload.clear();
            }
        });
    }

    onChangeEstado(event: any) {
        this.editarRequest.estado = event.value;
        if (this.editarRequest.estado.code === 2) {
            this.editarRequest.detalle = null;
        }
        this.actualizarRequestMasivo();
    }
}
