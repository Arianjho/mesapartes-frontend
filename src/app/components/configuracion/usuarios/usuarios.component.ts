import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Partner } from 'src/app/entities/partner';
import { Perfil } from 'src/app/entities/perfil';
import { RegisterRequest, Usuario } from 'src/app/entities/usuarios';
import { PartnerService } from 'src/app/services/partner.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
    private readonly userService = inject(UsuariosService);
    private readonly messageService = inject(MessageService);
    private readonly fb = inject(NonNullableFormBuilder);
    private readonly partnerService = inject(PartnerService);

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
    perfiles: Perfil[] = [
        { id: 1, perfil: 'Administrador' },
        { id: 2, perfil: 'Partner' },
        { id: 3, perfil: 'Soporte' }
    ];

    perfilesSelection = this.perfiles.map(p => ({ label: p.perfil, value: p }));
    partnersSelection: { label: string; value: Partner }[] = [];

    formGroup!: FormGroup;

    ngOnInit(): void {
        this.getUsers();
        this.initForm();
        this.loadPartners();
    }

    actualizarTabla() {
        this.getUsers();
    }

    loadPartners() {
        this.partnerService.listar().subscribe({
            next: (res) => {
                this.partnersSelection = res.data.map(p => ({
                    label: p.partner,
                    value: p
                }));
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudieron cargar los partners'
                });
            }
        });
    }

    initForm() {
        this.formGroup = this.fb.group({
            dni: ['', [Validators.required, Validators.minLength(8)]],
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            celular: ['', Validators.required],
            usuario: ['', Validators.required],
            password: ['', Validators.required],
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
            this.formGroup.patchValue({
                dni: user.dni,
                nombres: user.nombres,
                apellidos: user.apellidos,
                correo: user.correo,
                celular: user.celular,
                usuario: user.usuario,
                estado: user.estado,
                partner: user.partner,
                perfil: user.perfil
            });
            this.formGroup.get('password')?.reset();
        } else {
            this.formGroup.reset();
            this.formGroup.patchValue({ estado: 1 });
        }

        this.userRegisterDialog = true;
    }

    hideUserDialog() {
        this.userRegisterDialog = false;
        this.formGroup.reset();
        this.selectedUser = null;
    }

    submitUser() {
        if (this.operacion === 'edit') { this.formGroup.get('password')?.setValue("1") }

        if (this.formGroup.invalid) {
            this.formGroup.markAllAsTouched();
            return;
        }

        const payload = this.formGroup.getRawValue() as RegisterRequest;

        this.loading = true;

        if (this.operacion === 'edit' && this.selectedUser) {
            this.userService.updateUsuario(this.selectedUser.id, payload).subscribe({
                next: (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: res.message
                    });
                    this.loading = false;
                    this.getUsers();
                    this.hideUserDialog();
                },
                error: () => {
                    this.loading = false;
                }
            });
        } else {
            this.userService.register(payload).subscribe({
                next: (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: res.message
                    });
                    this.loading = false;
                    this.getUsers();
                    this.hideUserDialog();
                },
                error: () => {
                    this.loading = false;
                }
            });
        }
    }

    agregar() {
        this.openDialog('create');
    }

    editar(user: Usuario) {
        this.openDialog('edit', user);
    }

    ver(user: Usuario) {
        this.openDialog('view', user);
    }


    loadPartnersAndPerfiles() {
        //
    }

}
