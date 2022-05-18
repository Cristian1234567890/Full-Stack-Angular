import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../servicios/api/api.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  constructor(private router: Router, private RestService: ApiService, private cookies: CookieService) {}

  ngOnInit(): void {}

  onLogOut() {
    this.router.navigate(['']);
    this.cookies.deleteAll();
  }

  searchForm = new FormGroup({
    id: new FormControl('', Validators.required),
  });

  onSearch(form: any) {
    this.RestService.post('http://localhost:2400/api/auth/client', {
      CLIENTNUM: Number(form['id']),}).subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.router.navigate(['cliente'],respuesta);
      },
      (error) => {
        alert('El cliente no existe');
      }
    );
  }
}
