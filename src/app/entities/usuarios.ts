import { Partner } from "./partner";
import { Perfil } from "./perfil";

export interface Usuario {
    id: number;
    dni: string;
    nombres: string;
    apellidos: string;
    correo: string;
    celular: string;
    usuario: string;
    estado: number;
    perfil: Perfil;
    partner: Partner;
    token: string;
}

export interface LoginRequest {
    usuario: string;
    password: string;
}
