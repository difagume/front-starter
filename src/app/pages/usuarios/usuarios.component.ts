// https://www.npmjs.com/package/@swimlane/ngx-datatable
// https://plnkr.co/edit/2F1Jol1i9BsYYWNat42V?p=info
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core';
import { Usuario } from '../../models';
import { UsuarioService } from '../../services/usuario.service';

declare let swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  data = [];
  temp = [];
  usuario: Usuario;
  usuarioEliminar: Usuario;
  usuarioIndex;
  usuarioLogueadoId;
  columns = [
    { prop: 'usuario' },
    { name: 'Nombre' },
    { name: 'Apellido' },
    { name: 'Email' },
    { name: 'Rol' }
  ];

  cargando = false;

  constructor(private usuarioService: UsuarioService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.obtenerUsuarios();
    this.usuarioLogueadoId = this.usuarioService.usuarioLogueadoId;
  }

  obtenerUsuarios() {
    this.cargando = true;
    this.usuarioService.obtenerUsuarios()
      .subscribe((usuarios: Usuario[]) => {
        // cache our list
        this.temp = [...usuarios];
        // push our inital complete list
        this.data = usuarios;
        this.cargando = false;
      }, error => { });
  }

  updateFilter(event) {
    const val = event.target.value;
    // filter our data
    const temp = this.temp.filter(d => {
      return d.usuario.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the data
    this.data = temp;
  }

  /* onSelect({ selected }) {
    console.log('idUsu:', selected[0].id, this.usuario[0].id);
  } */

  editarUsuario(id) {
    this.temp = [...this.data];
    this.usuario = this.temp.find(usu => usu.id === id);
    this.usuarioIndex = this.temp.indexOf(this.usuario);

    setTimeout(() => {
      this.scrollTo('editar');
    }, 250);
  }

  eliminarUsuario(id) {
    // todo validar que no va a auto elininar su usuario
    this.usuario = null;
    this.temp = [...this.data];
    this.usuarioEliminar = this.temp.find(usu => usu.id === id);
    this.usuarioIndex = this.temp.indexOf(this.usuarioEliminar);
    swal({
      title: '¿Estás seguro?',
      text: 'Estás a punto de eliminar al usuario: ' + this.usuarioEliminar.usuario,
      icon: 'warning',
      buttons: ['Cancelar', true],
      dangerMode: true,
    })
      .then(eliminar => {
        if (eliminar) {
          this.usuarioService.eliminarUsuario(this.usuarioEliminar)
            .subscribe((data: any) => {
              this.temp.splice(this.usuarioIndex, 1);
              this.data = [...this.temp];
              swal(data.name, data.message, 'success');
            }, error => { });
        }
      });
  }

  actualizarUsuario() {
    this.temp.splice(this.usuarioIndex, 1, this.usuario);
    this.data = [...this.temp];
    this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe((data: any) => {
        if (this.usuarioLogueadoId === this.usuario.id) {
          this.usuario.password = '💩';
          this.usuario.token = this.authenticationService.credentials.token;
          this.authenticationService.actualizarCredentials(this.usuario);
          console.log('1:', this.usuario);
          console.log('2', this.authenticationService.credentials);
        }
        swal(data.name, data.message, 'success');
      }, error => { });
  }

  scrollTo(className: string): void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  /* updateFilter(filter: string): void {

    const val = filter.trim().toLowerCase();

    this.temp = this.data.slice().filter((item: any) => {
      let searchStr = '';
      for (let i = 0; i < this.columns.length; i++) {
         searchStr += (item[this.columns[i]]).toString().toLowerCase();
      }
      return searchStr.indexOf(val) !== -1 || !val;
    });
  } */

}
