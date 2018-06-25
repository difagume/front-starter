export class Producto {

    constructor(
        public id: number,
        public nombre: string,
        public valor: number,
        public activo: boolean,
        public stock: number,
        public cantidad?: number
    ) { }
}
