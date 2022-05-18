import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from './servicios/api/api.service';

/* import http headers*/
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {
  
  constructor(private cookieService: CookieService, private router:Router, private RestService: ApiService){

  }
  
  redirect(flag:boolean):any{
    let auth = this.cookieService.get('token_access');
    const token = `Bearer ${auth}`;

    if(!flag){
      this.router.navigate(['']);
    }else {
      const header = new HttpHeaders().set("authorization", token);
      this.RestService.get('http://localhost:2400/api/auth/jwt-test', header).subscribe(
      (respuesta :any) => {
        console.log(respuesta);
      },
      (error) => {
        console.log('Este es el error: ', error);
        this.router.navigate(['']);
        this.cookieService.deleteAll();
      });
      
    }
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const cookie = this.cookieService.check('token_access');
    this.redirect(cookie);
    return cookie;
  }
  
}
