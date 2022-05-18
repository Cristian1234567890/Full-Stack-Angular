import { ViewChild, Component, OnInit, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AnyForUntypedForms,
} from '@angular/forms';
import { ApiService } from '../servicios/api/api.service';

/* To change page */
import { Router } from '@angular/router';

/* import cookie */
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private RestService: ApiService, private route: Router, private cokieService: CookieService) {}

  ngOnInit(): void {}

  /* Next is to get data from the form and use api  */

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  singUpForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfimation: new FormControl('', Validators.required),
  });

  public repuesta: any;
  onLogin(form: any) {
    console.log('Loging..');
    this.RestService.post('http://localhost:2400/api/auth/login', {
      email: form['usuario'],
      password: form['password'],
    }).subscribe(
      (respuesta :any) => {
        console.log(respuesta);
        this.repuesta = respuesta;

        this.cokieService.set('token_access',respuesta.token, undefined, '/');
        this.route.navigate(['info'], respuesta.token);
      },
      (error) => {
        console.log('Este es el error: ', error);
        alert('Credenciales no validas');
      }
    );
  }

  onSingup(form: any) {
    if (form['password'] == form['passwordConfimation']) {
      /* Change form */

      this.RestService.post('http://localhost:2400/api/auth/signup', {
        email: form['usuario'],
        password: form['password'],
      }).subscribe(
        (answer) => {
          const asIn = this.Loging.nativeElement;
          asIn.click();
          alert("Usuario creado");
        },
        (error) => {
          console.log('Este es el error: ', error);
          alert('Credenciales no validas o existentes');
        }
      );
    } else {
      alert('Contrasena no coinciden.');
    }
  }

  /* Next is to change login - singup */

  @ViewChild('text') tittle: any;
  @ViewChild('form') formulario: any;
  @ViewChild('asUp') boton: any;
  @ViewChild('asLoging') Loging: any;

  onClickIn(): void {
    const text = this.tittle.nativeElement;
    text.style.margin = '0%';

    const form = this.formulario.nativeElement;
    form.style.margin = '0%';
  }

  onClickUp(): void {
    const text = this.tittle.nativeElement;
    text.style.margin = '0 0 0 -50%';

    const form = this.formulario.nativeElement;
    form.style.margin = '0 0 0 -50%';
  }

  onLink(): void {
    const asUp = this.boton.nativeElement;
    asUp.click();
  }
}
