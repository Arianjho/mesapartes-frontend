import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: '',
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/inicio'] }
                ]
            },
            {
                label: 'Soporte',
                items: [
                    { label: 'Incidencias', icon: 'pi pi-fw pi-align-justify', routerLink: ['/soporte/incidencias'] },
                    { label: 'Diccionario', icon: 'pi pi-fw pi-align-justify', routerLink: ['/soporte/diccionario'] },
                    { label: 'Tickets', icon: 'pi pi-fw pi-align-justify', routerLink: ['/soporte/tickets'] }
                ]
            },
            {
                label: 'Configuración',
                items: [
                    { label: 'Empresas', icon: 'pi pi-fw pi-align-justify', routerLink: ['/configuracion/empresas'] }
                ]
            }
        ];
    }
}
