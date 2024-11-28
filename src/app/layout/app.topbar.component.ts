import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { UsuariosService } from '../services/usuarios.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [ConfirmationService, MessageService]
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    valuesTheme = [
        {
            theme: 'bootstrap4-light-blue',
            colorScheme: 'light',
            icon: 'pi pi pi-sun'
        },
        {
            theme: 'bootstrap4-dark-blue',
            colorScheme: 'dark',
            icon: 'pi pi pi-moon'
        },
    ];

    handle = false;
    iconTheme = 'pi pi pi-sun';
    iconLogout = 'pi pi-sign-out';

    constructor(
        public layoutService: LayoutService,
        private confirmationService: ConfirmationService,
        private usuarioService: UsuariosService,
    ) { }

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'En serio, desea cerrar sesión?',
            header: 'Cerrar Sesión',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: "none",
            rejectIcon: "none",
            rejectButtonStyleClass: "p-button-text",
            acceptLabel: "Si",
            rejectLabel: "No",
            accept: () => {
                this.usuarioService.logout();
            },
            reject: () => { }
        });
    }

    ngOnInit(): void {
        const savedTheme = localStorage.getItem("theme");
        const themeIndex = savedTheme === 'dark' ? 1 : 0;

        this.changeTheme(this.valuesTheme[themeIndex].theme, this.valuesTheme[themeIndex].colorScheme);
        this.iconTheme = this.valuesTheme[themeIndex].icon;
        this.handle = themeIndex === 1;
    }

    set theme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            theme: val,
        }));
    }

    set colorScheme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            colorScheme: val,
        }));
    }

    changeTheme(theme: string, colorScheme: string) {
        this.theme = theme;
        this.colorScheme = colorScheme;
    }

    handleTheme(toggle: boolean): void {
        const currentTheme = localStorage.getItem("theme") === "dark" ? 1 : 0;
        const newThemeIndex = !currentTheme ? 1 : 0;

        this.changeTheme(this.valuesTheme[newThemeIndex].theme, this.valuesTheme[newThemeIndex].colorScheme);
        this.iconTheme = this.valuesTheme[newThemeIndex].icon;

        localStorage.setItem("theme", this.valuesTheme[newThemeIndex].colorScheme);

        if (this.handle) {
            this.handle = false;
        } else {
            this.handle = true;
        }
    }
}
