import { estadosEmpresa, localModificado, modificarLocal } from './../../../entities/empresa';
import { OptionsNumber, OptionsString } from './../../soporte/incidencias/types/filtros';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Empresa, FiltrosEmpresa } from 'src/app/entities/empresa';
import { Partner } from 'src/app/entities/partner';
import { EmpresasService } from 'src/app/services/empresas.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
    templateUrl: './empresas.component.html',
    styleUrl: './empresas.component.scss'
})
export class EmpresasComponent implements OnInit {
    constructor(
        private empresasService: EmpresasService,
        private partnerService: PartnerService,
        private messageService: MessageService
    ) { }

    empresas: Empresa[] = [];
    empresasFiltradas: Empresa[] = [];
    empresa: Empresa = {} as Empresa;
    empresaRequest: Empresa = {} as Empresa;
    empresaOriginal: Empresa = {} as Empresa;
    partners: Partner[] = [];
    selectedPartners: OptionsNumber[] = [];
    estadoSubmit: string = '';
    estadosEmpresa: OptionsString[] = estadosEmpresa;
    modificarLocal: OptionsString[] = modificarLocal;
    operacion: number;
    localModificado: OptionsString[] = localModificado;
    localEdit: string = 'No';

    filtros: FiltrosEmpresa = {
        ruc: '',
        razonsocial: '',
        estado: {} as OptionsString,
        partner: {} as OptionsString,
        modlocal: {} as OptionsString
    };

    submitted: boolean = false;
    loading: boolean = false;
    cols: any[] = [];

    empresaDialog: boolean = false;
    empresaEditDialog: boolean = false;
    empresaDeleteDialog: boolean = false;
    filtrosDialog: boolean = false;
    labelDialog: string = '';

    listarEmpresas() {
        this.loading = true;
        this.empresasService.listar().subscribe({
            next: (res) => {
                this.empresas = res.data;
                this.empresasFiltradas = this.empresas.filter(empresa => {
                    return (
                        (this.filtros.ruc ? empresa.ruc?.includes(this.filtros.ruc) : true) &&
                        (this.filtros.razonsocial ? empresa.razonsocial?.includes(this.filtros.razonsocial) : true) &&
                        (this.filtros.partner.name ? empresa.partner?.includes(this.filtros.partner.name) : true) &&
                        (this.filtros.estado.name ? empresa.estado === this.filtros.estado.name : true) &&
                        (this.filtros.modlocal.name ? empresa.modlocal?.includes(this.filtros.modlocal.name) : true)
                    );
                });
                this.loading = false;
            },
            error: (error: HttpErrorResponse) => {
                this.loading = false;
                this.empresas = [];
                console.error(error);
            }
        });
    }

    listarPartners() {
        this.partnerService.listar().subscribe({
            next: (res) => {
                this.partners = res.data;
                this.selectedPartners = this.partners.map(partner => {
                    return {
                        name: partner.partner,
                        code: partner.id
                    }
                })
            },
            error: (error: HttpErrorResponse) => {
                this.partners = [];
                console.error(error);
            }
        })
    }

    actualizarTabla() {
        this.listarEmpresas();
    }

    openFiltros() {
        this.filtrosDialog = true;
        this.estadoSubmit = 'Aplicar Filtros';
    }

    hideDialogFiltros() {
        this.filtrosDialog = false;
    }

    onGlobalFilter(dt: any, event: any) {
        dt.filterGlobal(event.target.value, 'contains');
    }

    ngOnInit(): void {
        this.listarEmpresas();
        this.listarPartners();
    }

    aplicarFiltros() {
        this.loading = true;
        this.estadoSubmit = 'Aplicando filtros...';

        this.empresasFiltradas = this.empresas;

        this.empresasFiltradas = this.empresas.filter(empresa => {
            return (
                (this.filtros.ruc ? empresa.ruc?.includes(this.filtros.ruc) : true) &&
                (this.filtros.razonsocial ? empresa.razonsocial?.includes(this.filtros.razonsocial) : true) &&
                (this.filtros.partner.name ? empresa.partner?.includes(this.filtros.partner.name) : true) &&
                (this.filtros.estado.name ? empresa.estado === this.filtros.estado.name : true) &&
                (this.filtros.modlocal.name ? empresa.modlocal?.includes(this.filtros.modlocal.name) : true)
            );
        });

        this.loading = false;
        this.filtrosDialog = false;
    }

    verIncidencia(empresa: Empresa) {
        this.empresa = empresa;
        this.empresaDialog = true;
    }

    editarEmpresa(empresa: Empresa) {
        this.operacion = 1;
        this.empresaOriginal = { ...empresa };
        this.empresaRequest = { ...this.empresaOriginal };
        this.estadoSubmit = 'Editar';
        this.labelDialog = 'Editar Empresa - ' + empresa.ruc;
        this.empresaEditDialog = true;
    }

    agregarEmpresa() {
        this.operacion = 2;
        this.empresaRequest = {} as Empresa;
        this.estadoSubmit = 'Agregar';
        this.labelDialog = 'Agregar Empresa';
        this.empresaEditDialog = true;
    }

    hideDialogVer() {
        this.empresaDialog = false;
    }

    hideDialogEditar() {
        this.empresaRequest = { ...this.empresaOriginal };
        this.empresaEditDialog = false;
    }

    submitEditarEmpresa(empresaRequest: Empresa, operacion: number) {
        this.loading = true;

        if (this.localEdit == 'Si') {
            const fecha = new Date();
            const formattedDate = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')} ${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')}:${String(fecha.getSeconds()).padStart(2, '0')}`;
            empresaRequest.ultmodificacion = formattedDate;
        }

        if (operacion == 1) {
            this.estadoSubmit = 'Editando...';

            this.empresasService.editarUno(empresaRequest.id, empresaRequest).subscribe({
                next: (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Exito',
                        detail: res.message
                    });
                    this.estadoSubmit = 'Editar';
                    this.loading = false;
                    this.actualizarTabla();
                    this.hideDialogEditar();
                },
                error: (error: HttpErrorResponse) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Ocurrio un error',
                        detail: error.message
                    });
                }
            });
        } else if (operacion == 2) {
            this.estadoSubmit = 'Agregando...';

            this.empresasService.crearUno(empresaRequest).subscribe({
                next: (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Exito',
                        detail: res.message
                    });
                    this.estadoSubmit = 'Agregar';
                    this.loading = false;
                    this.actualizarTabla();
                    this.hideDialogEditar();
                },
                error: (error: HttpErrorResponse) => {
                    this.estadoSubmit = 'Agregar';
                    this.loading = false;
                }
            })
        }
    }

    limpiarFiltros() {
        this.filtros = {
            ruc: '',
            razonsocial: '',
            estado: {} as OptionsString,
            partner: {} as OptionsString,
            modlocal: {} as OptionsString
        };
    }
}
