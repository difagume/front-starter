import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config';

declare let swal: any;

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])]
    });
  }

  restablecerPassword() {
    const url = `${URL_SERVICIOS}/login/olvido`;
    this.http.post(url, { usuario: this.form.value.uname })
      .subscribe((data: any) => {
        swal(data.name, data.message, 'success');
        this.router.navigate(['/login']);
      }, error => { });
  }
}
