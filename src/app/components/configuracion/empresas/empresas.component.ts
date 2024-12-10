import { estadosEmpresa, modificarLocal } from './../../../entities/empresa';
import { OptionsNumber, OptionsString } from './../../soporte/incidencias/types/filtros';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
        private partnerService: PartnerService
    ) { }

    empresas: Empresa[] = [];
    empresa: Empresa = {} as Empresa;
    partners: Partner[] = [];
    selectedPartners: OptionsNumber[] = [];
    estadoSubmit: string = '';
    estadosEmpresa: OptionsString[] = estadosEmpresa;
    modificarLocal: OptionsString[] = modificarLocal;

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
    filtrosDialog: boolean = false;

    listarEmpresas() {
        this.loading = true;
        this.empresasService.listar().subscribe({
            next: (res) => {
                this.empresas = res.data;
                this.empresas = this.empresas.filter(empresa => {
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

        this.empresas = this.empresas.filter(empresa => {
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
}
