import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // get
  public get(url:string, headers:HttpHeaders){
    return this.http.get(url, {headers:headers}); 
  }

  //post 
  public post(url:string, body:any)
  {
    return this.http.post(url,body); 
  }

}
