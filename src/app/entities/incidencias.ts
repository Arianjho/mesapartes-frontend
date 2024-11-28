import { OptionsNumber } from "../components/soporte/incidencias/types/filtros";

export interface Incidencia {
    id: number;
    revisado: number;
    ruc: string;
    fecha: Date;
    razonsocial: string;
    documento: string;
    tipodocumento: string;
    serie: string;
    correlativo: string;
    valordigerido: string;
    coderror: string;
    descripcion: string;
    fecharevisado: string | null;
    detalle: string | null;
    partner: string;
}

export interface EditarIncidencia {
    id: number;
    detalle: string;
    estado: OptionsNumber;
}


export interface EditarIncidenciaRequest {
    id: number;
    detalle: string;
    estado: number;
}

export interface IncidenciaRevisadaResponse {
    incidencia: Incidencia;
    posible_error: string;
}
