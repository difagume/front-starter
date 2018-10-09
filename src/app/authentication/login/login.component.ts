import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Logger, AuthenticationService } from '../../core';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;
  form: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { this.createForm(); }

  ngOnInit() { }

  login() {
    this.isLoading = true;
    this.authenticationService.login(this.form.value)
      .pipe(finalize(() => {
        this.form.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe(credentials => {
        log.debug(`${credentials.usuario} inició sesión exitosamente`);
        this.router.navigate(['/'], { replaceUrl: true });
      }, error => {
        // log.debug('Login error --> ', error);
        // error.interceptor actua
      });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
}
