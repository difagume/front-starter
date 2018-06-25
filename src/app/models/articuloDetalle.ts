export class ArticuloDetalle {

    constructor(
        public id: number,
        public id_articulo: number,
        public id_producto: number,
        public cantidad: number,
        public activo: boolean
    ) { }
}
