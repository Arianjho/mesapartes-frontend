import { OptionsNumber, OptionsString } from "../components/soporte/incidencias/types/filtros";

export interface Empresa {
    id: number;
    ruc: string;
    razonsocial: string;
    partner: string;
    estado: string;
    modalidad: string;
    modlocal: string;
    ultmodificacion: string;
    formaenvio: string;
}

export interface FiltrosEmpresa {
    ruc: string;
    razonsocial: string;
    partner: OptionsString;
    estado: OptionsString;
    modlocal: OptionsString;
}

export const estadosEmpresa: OptionsString[] = [
    {
        name: 'HABILITADO',
        code: 'HABILITADO'
    },
    {
        name: 'INHABILITADO',
        code: 'INHABILITADO'
    },
    {
        name: 'DE BAJA',
        code: 'DE BAJA'
    }
]

export const modificarLocal: OptionsString[] = [
    {
        name: 'Si',
        code: 'Si'
    },
    {
        name: 'No',
        code: 'No'
    }
]
