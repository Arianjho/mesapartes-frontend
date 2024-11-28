import { UsuariosService } from './../../../../services/usuarios.service';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    usuario!: string;

    constructor(public layoutService: LayoutService, private usuarioService: UsuariosService, private messageService: MessageService, private router: Router,) { }

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

    login(): void {
        this.usuarioService.login({ usuario: this.usuario, password: this.password }).subscribe({
            next: (res) => {
                if (res.status !== 200) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
                } else {
                    localStorage.setItem('token', res.data.token);
                    this.messageService.add({ severity: 'success', summary: 'Exito', detail: `Bienvenido ${res.data.nombres}!` });
                    this.router.navigate(['/inicio']);
                }
            },
            error: (err) => {
                const errorMessage = err.error?.message || 'Error desconocido';
                this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
            },
            complete: () => console.log('Login request completed')
        });
    }


    ngOnInit(): void {
        if (this.usuarioService.isAuthenticated()) {
            this.router.navigate(['/inicio']);
        }
        const savedTheme = localStorage.getItem("theme");
        const themeIndex = savedTheme === 'dark' ? 1 : 0;

        this.changeTheme(this.valuesTheme[themeIndex].theme, this.valuesTheme[themeIndex].colorScheme);
        this.iconTheme = this.valuesTheme[themeIndex].icon;
        this.handle = themeIndex === 1;
    }

    changeTheme(theme: string, colorScheme: string) {
        this.theme = theme;
        this.colorScheme = colorScheme;
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
}
