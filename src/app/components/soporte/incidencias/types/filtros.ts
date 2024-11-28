import { Errores } from "src/app/entities/errores";

export interface Filtros {
    codErrors: string;
    fechaInicio: string;
    fechaFin: string;
    estados: string;
}

export interface Estados {
    estado: number;
    check: boolean;
}

export interface OptionsString {
    name: string,
    code: string
}

export interface OptionsNumber {
    name: string,
    code: number
}

export interface Cargando {
    descripcion: string;
    estado: boolean;
}
