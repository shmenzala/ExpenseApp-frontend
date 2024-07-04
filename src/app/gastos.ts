import { Categorias_gasto } from "./categorias_gasto";

export interface Gastos {
    id: number;
    tipo_gasto: string;
    categorias_gasto: Categorias_gasto;
    gasto: number;
    cantidad: number;
    total: number;
    fecha: string;
}

export interface GastosRequest {
    tipo_gasto: string;
    categorias_gasto: Categorias_gasto;
    gasto: number;
    cantidad: number;
}