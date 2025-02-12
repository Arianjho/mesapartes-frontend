export interface Auditoria {
    id: number;
    ruc: string;
    usuario: string;
    menu: string;
    proceso: string;
    fecha_proceso: Date;
    session_id: string;
}
