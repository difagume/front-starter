// https://www.npmjs.com/package/@swimlane/ngx-datatable
// https://plnkr.co/edit/2F1Jol1i9BsYYWNat42V?p=info
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Logger } from '../../core';
import { Rol, RolCreateInput, Usuario, UsuarioUpdateInput } from '../../generated/graphql';
import { ParametrosService } from '../../services/parametros.service';
import { UsuarioService } from '../../services/usuario.service';
declare let swal: any;

const log = new Logger('UsuariosComponent');

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  usuarios = [];
  temp = [];
  usuario: Usuario;
  usuarioEliminar: Usuario;
  usuarioIndex;
  usuarioLogueadoId;
  nuevoRol: RolCreateInput = { nombre: null };
  roles: Rol[];
  columns = [
    { prop: 'usuario' },
    { name: 'Nombre' },
    { name: 'Apellido' },
    { name: 'Email' },
    { name: 'Rol' }
  ];

  cargando = true;
  private subscriptions = new Subscription();

  constructor(private usuarioService: UsuarioService,
    private parametrosService: ParametrosService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerRoles();
    this.usuarioLogueadoId = this.usuarioService.usuarioLogueadoId;

    this.usuarioService.subscribeToSignup();
  }

  obtenerUsuarios() {
    this.subscriptions.add(
      this.usuarioService.obtenerUsuarios()
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.cargando = loading;
          this.temp = [...data['usuarios']];
          this.usuarios = data && data['usuarios'];
        })
    );
  }

  /**
   * Filtro para todas las columnas
   * @param event
   */
  updateFilter(event) {
    const val = event.target.value;

    const temp = this.temp.filter(
      item => Object.keys(item).some(
        k => item[k] != null && item[k].toString().toLowerCase()
          .includes(val.toLowerCase()))
    );
    this.usuarios = temp;
  }

  /**
   * Función que filtra una columna de la tabla
   * @param event
   */
  /* updateFilter(event) {
    const val = event.target.value;
    // filter our data
    const temp = this.temp.filter(d => {
      return d.usuario.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the data
    this.usuarios = temp;
  } */

  /**
   * Función que se llama al hacer clic en el botón de editar un usuario
   * @param id del usuario seleccionado para ser editado
   */
  editarUsuario(id) {
    // Seteo usuario seleccionado
    this.temp = [...this.usuarios];
    this.usuario = { ...this.temp.find(usu => usu.id === id) };
    this.usuarioIndex = this.temp.indexOf(this.usuario);

    // Seteo roles del usuario
    this.setearRolesUsuario();

    setTimeout(() => {
      this.scrollTo('editar');
    }, 250);
  }

  /**
   * Función que se llama al hacer click en el botón de elimimar usuario
   * @param id del usuario a ser eliminado
   */
  eliminarUsuario(id) {
    this.usuario = null;
    this.temp = [...this.usuarios];
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
            .subscribe(({ data: { eliminarUsuario } }) => {
              this.temp.splice(this.usuarioIndex, 1);
              this.usuarios = [...this.temp];
              swal('Usuario eliminado 😪', `El usuario ${eliminarUsuario.usuario} ha sido eliminado`, 'success');
            });
        }
      });
  }

  /**
   * Función que se llama al hacer click en el botón guardar
   */
  actualizarUsuario() {
    // Filtro los roles seleccionados
    const rolesActivos = this.roles.filter(rol => rol.activo);
    // Seteo roles en usuario
    const rolesUsu = rolesActivos.map(rol => rol.nombre).toString();
    this.usuario.rol = rolesUsu;

    // Lleno objeto para actualizar
    const usuarioActualizar: UsuarioUpdateInput = {
      usuario: this.usuario.usuario,
      email: this.usuario.email,
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      rol: this.usuario.rol
    };
    // Actualizo usuario
    this.usuarioService.actualizarUsuario(usuarioActualizar, this.usuario.id)
      .subscribe(({ data: { updateUsuario } }) => {
        swal('Usuario actualizado 😏', `El usuario ${updateUsuario.usuario} ha sido actualizado`, 'success');
        this.usuario = null;
      });
  }

  scrollTo(className: string): void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Obtengo todos los roles activos
   */
  obtenerRoles() {
    this.subscriptions.add(
      this.parametrosService.obtenerRoles()
        .valueChanges.subscribe(({ data }) => (this.roles = data['roles']))
    );
  }

  /**
   * Seteo los roles activos que tiene el usuario seleccionado para mostrarlos en el front
   */
  setearRolesUsuario() {
    // Falseo todos los roles
    this.roles.forEach(rol => rol.activo = false);
    // Habilito los roles que tiene el usuario
    if (this.usuario.rol.length > 0) {
      this.usuario.rol.split(',').forEach(rolNombre => {
        const rol = this.roles.find(r => r.nombre === rolNombre);
        rol.activo = true;
        let index = this.roles.indexOf(rol);
        this.roles.fill(rol, index, index++);
      });
    }
  }

  /**
  * Actualiza los roles seleccionados del usuario que se está editando
   * @param ckb datos del checkbox clickeado
   */
  actualizarRoles(ckb) {
    this.roles.forEach(rol => {
      if (rol.id === ckb.id) {
        rol.activo = ckb.checked;
      }
    });
  }

  abrirModal(content) {
    this.nuevoRol = { nombre: null };
    this.modalService.open(content, { centered: true });
  }

  crearRol() {
    this.usuarioService
      .crearRol(this.nuevoRol)
      .subscribe(({ data: { createRol } }) => {
        this.nuevoRol = { nombre: null };
        this.modalService.dismissAll();
        swal(
          'Rol creado 😏',
          `El rol ${createRol.nombre} ha sido creado`,
          'success'
        );
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
