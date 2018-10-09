import { ArticuloDetalle } from './articuloDetalle';
export class Articulo {

    constructor(
        public id: number,
        public nombre: string,
        public valor: number,
        public activo: boolean,
        public tiempoPreparacion: string,
        public idMenu: number,
        public articuloDetalle: ArticuloDetalle[]
    ) { }
}
