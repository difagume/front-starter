import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Credentials, Logger } from '../../core';
import { Usuario } from '../../models';
import { UsuarioService } from '../../services/usuario.service';

declare let swal: any;
const log = new Logger('PerfilComponent');

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario: Credentials;

  constructor(
    private authenticationService: AuthenticationService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    // this.usuario = this.authenticationService._credentials;
    this.usuario = new Usuario(
      this.authenticationService.credentials.id,
      this.authenticationService.credentials.usuario,
      this.authenticationService.credentials.password,
      this.authenticationService.credentials.email,
      this.authenticationService.credentials.nombre,
      this.authenticationService.credentials.apellido,
      this.authenticationService.credentials.rol,
      this.authenticationService.credentials.img,
      this.authenticationService.credentials.social,
      this.authenticationService.credentials.token
    );
  }

  guardar() {
    this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe((data: any) => {
        this.authenticationService.actualizarCredentials(this.usuario);
        swal(data.name, data.message, 'success');
      }, error => { });
  }
}
