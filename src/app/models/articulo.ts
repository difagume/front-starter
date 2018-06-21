import { ArticuloDetalle } from './articuloDetalle';
export class Articulo {

    constructor(
        public id: string,
        public nombre: string,
        public valor: number,
        public activo: boolean,
        public tiempo_preparacion: string,
        public id_menu: number,
        public articuloDetalle: ArticuloDetalle[]
    ) { }
}
