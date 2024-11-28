import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

export const authGuard: CanActivateFn = (route, state) => {
    const usuarioService = inject(UsuariosService);
    const router = inject(Router);

    if (usuarioService.isAuthenticated()) {
        return true;
    } else {
        router.navigate(['/auth/login']);
        return false;
    }
};
