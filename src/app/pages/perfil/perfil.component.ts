import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Logger } from '../../core';
import { Usuarios, UsuariosUpdateInput } from '../../generated/graphql';
import { UsuarioService } from '../../services/usuario.service';

declare let swal: any;
const log = new Logger('PerfilComponent');

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario: UsuariosUpdateInput;

  constructor(
    private authenticationService: AuthenticationService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = {
      usuario: this.authenticationService.credentials.usuario,
      email: this.authenticationService.credentials.email,
      nombre: this.authenticationService.credentials.nombre,
      apellido: this.authenticationService.credentials.apellido
    };
  }

  guardar() {
    this.usuarioService.actualizarUsuario(this.usuario, this.authenticationService.credentials.id)
      .subscribe(({ data: { updateUsuarios } }) => {

        this.authenticationService.actualizarCredentials({
          id: this.authenticationService.credentials.id,
          usuario: this.usuario.usuario,
          password: this.authenticationService.credentials.password,
          email: this.usuario.email,
          nombre: this.usuario.nombre,
          apellido: this.usuario.apellido,
          rol: this.authenticationService.credentials.rol,
          img: this.authenticationService.credentials.img,
          social: this.authenticationService.credentials.social,
          token: this.authenticationService.credentials.token
        });

        swal('Usuario actualizado 😏', `El usuario ${updateUsuarios.usuario} ha sido actualizado`, 'success');
      });
  }
}
