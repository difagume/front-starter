export class Usuario {

    constructor(
        public id: string,
        public username: string,
        public password: string,
        public email: string,
        public nombre: string,
        public apellido: string,
        public rol: string,
        public img: string,
        public social: boolean,
        public token: string
    ) { }
}
