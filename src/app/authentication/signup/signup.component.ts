import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Logger } from '../../core';
import { UsuariosCreateInput } from '../../generated/graphql';
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
  usuario: UsuariosCreateInput;
  constructor(private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.form = this.fb.group({
      usuario: [null, Validators.compose([Validators.required])],
      nombre: [null, Validators.compose([Validators.required])],
      apellido: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  onSubmit() {
    this.router.navigate(['/']);
  }

  guardar() {
    this.usuario = {
      usuario: this.form.value.usuario,
      password: this.form.value.password,
      email: this.form.value.email,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido
    };

    this.usuarioService.signup(this.usuario)
      .subscribe(({ data }) => {
        swal('Usuario creado 😏', `El usuario: ${data.signup.user.usuario} ha sido creado`, 'success');
        this.router.navigate(['/login']);
      });
  }

}
