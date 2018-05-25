// https://www.npmjs.com/package/@swimlane/ngx-datatable
// https://plnkr.co/edit/2F1Jol1i9BsYYWNat42V?p=info
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  data = [];

  temp = [];

  usuarioSel = [];

  columns = [
    { prop: 'usuario' },
    { name: 'Nombre' },
    { name: 'Apellido' },
    { name: 'Email' },
    { name: 'Rol' }
  ];

  cargando = false;

  constructor(private usuarioService: UsuarioService) {

    /*  this.fetch((data) => {
       // cache our list
       this.temp = [...data];
       // push our inital complete list
       this.data = data;
     }); */
  }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  /* fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  } */

  updateFilter(event) {
    const val = event.target.value;
    // filter our data
    const temp = this.temp.filter(d => {
      return d.usuario.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the data
    this.data = temp;
  }

  onSelect({ selected }) {
    console.log('idUsu:', selected[0].id, this.usuarioSel[0].id);
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

}
