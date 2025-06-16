import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
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
    user: Usuario = {} as Usuario;

    userRegisterDialog = false;
    viewMode = false;
    labelSubmit = '';
    headerDialog = '';
    operacion: 'create' | 'edit' = 'create';
    selectedUser: Usuario | null = null;

    estados = [
        { label: 'Activo', value: 1 },
        { label: 'Inactivo', value: 0 }
    ];

    partners: any[] = []; // debes cargar desde API
    perfiles: any[] = []; // debes cargar desde API
    formGroup!: FormGroup;

    ngOnInit(): void {
        this.getUsers();
        this.initForm();
        this.loadPartnersAndPerfiles(); // si usas servicios para esto
    }

    initForm() {
        this.formGroup = this.fb.group({
            dni: ['', [Validators.required, Validators.minLength(8)]],
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            estado: [1, Validators.required],
            partner: [null, Validators.required],
            perfil: [null, Validators.required]
        });
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
                });
                this.loading = false;
            }
        });
    }

    openDialog(mode: 'create' | 'edit' | 'view', user?: Usuario) {
        this.viewMode = mode === 'view';
        this.operacion = mode === 'edit' ? 'edit' : 'create';
        this.headerDialog =
            mode === 'create'
                ? 'Registrar Usuario'
                : mode === 'edit'
                    ? `Editar Usuario - ${user?.dni}`
                    : `Detalle Usuario - ${user?.dni}`;
        this.labelSubmit = mode === 'edit' ? 'Guardar Cambios' : 'Registrar';

        if (user) {
            this.selectedUser = user;
            this.formGroup.setValue({
                dni: user.dni,
                nombres: user.nombres,
                apellidos: user.apellidos,
                estado: user.estado,
                partner: user.partner.id,
                perfil: user.perfil.id
            });
        } else {
            this.formGroup.reset();
            this.formGroup.patchValue({ estado: 1 });
        }

        this.userRegisterDialog = true;
    }

    //     hideUserDialog() {
    //         this.userRegisterDialog = false;
    //         this.formGroup.reset();
    //         this.selectedUser = null;
    //     }

    //     submitUser() {
    //         if (this.formGroup.invalid) {
    //             this.formGroup.markAllAsTouched();
    //             return;
    //         }

    //         const payload = this.formGroup.getRawValue();
    //         this.loading = true;

    //         if (this.operacion === 'edit' && this.selectedUser) {
    //             this.userService.update(this.selectedUser.id, payload).subscribe({
    //                 next: (res) => {
    //                     this.messageService.add({
    //                         severity: 'success',
    //                         summary: 'Éxito',
    //                         detail: res.message
    //                     });
    //                     this.loading = false;
    //                     this.getUsers();
    //                     this.hideUserDialog();
    //                 },
    //                 error: () => {
    //                     this.loading = false;
    //                 }
    //             });
    //         } else {
    //             this.userService.create(payload).subscribe({
    //                 next: (res) => {
    //                     this.messageService.add({
    //                         severity: 'success',
    //                         summary: 'Éxito',
    //                         detail: res.message
    //                     });
    //                     this.loading = false;
    //                     this.getUsers();
    //                     this.hideUserDialog();
    //                 },
    //                 error: () => {
    //                     this.loading = false;
    //                 }
    //             });
    //         }
    //     }

    //     ver(user: Usuario) {
    //         this.openDialog('view', user);
    //     }

    //     agregar() {
    //         this.openDialog('create');
    //     }

    //     editar(user: Usuario) {
    //         this.openDialog('edit', user);
    //     }

    //     eliminar(user: Usuario) {
    //         this.userService.delete(user.id).subscribe({
    //             next: () => {
    //                 this.messageService.add({
    //                     severity: 'success',
    //                     summary: 'Eliminado',
    //                     detail: `Usuario ${user.dni} eliminado`
    //                 });
    //                 this.getUsers();
    //             }
    //         });
    //     }

    loadPartnersAndPerfiles() {
        //
    }

}
