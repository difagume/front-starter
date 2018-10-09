export class ArticuloDetalle {
    public id: number;
    public idArticulo: number;
    public idProducto: number;
    public cantidad: number;
    public activo: boolean;
    constructor(idProducto, cantidad) {
        this.idProducto = idProducto;
        this.cantidad = cantidad;
    }
}
