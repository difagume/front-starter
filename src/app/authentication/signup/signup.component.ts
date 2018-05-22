import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Logger } from '../../core';
import { Usuario } from '../../models';
import { UsuarioService } from '../../services/usuario.service';

declare let swal: any;
const log = new Logger('SignupComponent');

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  usuario: Usuario;
  constructor(private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.form = this.fb.group({
      usuario: [null, Validators.compose([Validators.required])],
      nombre: [null, Validators.compose([Validators.required])],
      apellido: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  onSubmit() {
    this.router.navigate(['/']);
  }

  guardar() {
    this.usuario = new Usuario(
      null,
      this.form.value.usuario,
      this.form.value.password,
      this.form.value.email,
      this.form.value.nombre,
      this.form.value.apellido,
      null,
      null,
      false,
      null);

    this.usuarioService.crearUsuario(this.usuario)
      .subscribe((data: any) => {
        swal(data.name, data.message, 'success');
        this.router.navigate(['/authentication/login']);
      }, error => { });
  }

}
