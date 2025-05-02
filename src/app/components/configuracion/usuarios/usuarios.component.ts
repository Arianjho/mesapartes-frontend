import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/entities/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
    private readonly userService = inject(UsuariosService);
    private readonly messageService = inject(MessageService);
    private readonly fb = inject(NonNullableFormBuilder);

    submitted: boolean = false;
    loading: boolean = false;
    cols: any[] = [];

    users: Usuario[] = [];

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.loading = true;
        this.userService.getAll().subscribe({
            next: (res) => {
                this.users = res.data;
                this.loading = false;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.error.message,
                    life: 3000
                });
                this.loading = false;
            }
        });
    }

    onGlobalFilter(dt: any, event: any) {
        dt.filterGlobal(event.target.value, 'contains');
    }

    actualizarTabla() {
        this.getUsers();
    }

    ver(user: Usuario) { console.log(user); }

    agregar() { console.log('operación agregar'); }

    editar(user: Usuario) { console.log(user); }

    eliminar(user: Usuario) { console.log(user); }

}
