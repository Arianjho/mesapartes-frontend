interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: string;
    rating?: number;
}

export interface Auditoria {
    ruc: string;
    usuario_sol: string;
    menu: string;
    proceso: string;
    fecha_proceso: string;
}
