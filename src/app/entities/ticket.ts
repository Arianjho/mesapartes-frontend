import { Empresa } from "./empresa";
import { Usuario } from "./usuarios";

export interface Ticket {
    id: number;
    asunto: string;
    mensaje: string;
    estado: number;
    adjunto: string;
    detalle: string;
    usuario: Usuario;
    empresa: Empresa;
}
