import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CustomValidators } from 'ng2-validation';
import { ActualizarPassword } from '../../graphql/graphql';

declare let swal: any;
const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit {

  public form: FormGroup;
  token: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private apollo: Apollo) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: password,
      confirmPassword: confirmPassword
    });

    this.activatedRouter.params
      .subscribe(params => {
        this.token = params['token'];
      });
  }

  actualizar() {
    return this.apollo.mutate({
      mutation: ActualizarPassword,
      variables: {
        token: this.token,
        password: this.form.value.password
      }
    })
      .subscribe(({ data: { usuario } }) => {
        swal('Contraseña restablecida 😄',
          `Se actualizó la contraseña del usuario ${usuario.usuario}`,
          'success');
        this.router.navigate(['/login']);
      });
  }
}
