import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { RestablecerPassword } from '../../graphql/graphql';

declare let swal: any;

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])]
    });
  }

  restablecerPassword() {
    return this.apollo.mutate({
      mutation: RestablecerPassword,
      variables: {
        usuario: this.form.value.uname,
        email: this.form.value.uname
      }
    })
      .subscribe(({ data: { usuario } }) => {
        swal('Email enviado 😄',
          `Se te ha enviado un correo a ${usuario.email} con los pasos para actualizar la contraseña`,
          'success');
        this.router.navigate(['/login']);
      });
  }
}
