import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../servicios/api/api.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements AfterViewInit{

  public respuesta:any;
  constructor(private router:Router, private cookies: CookieService, private RestService: ApiService) { 
    this.respuesta = this.router.getCurrentNavigation()?.extras;
  }

  ngAfterViewInit(): void {
    this.setInfo();
  }
  /* Set information */
  
  @ViewChild('numero') num:any;
  @ViewChild('estatus') status:any;
  @ViewChild('edad') age:any;
  @ViewChild('genero') gender:any;
  @ViewChild('educacion') educ:any;
  @ViewChild('ingresos') inco:any;
  @ViewChild('tarjeta') card:any;
  @ViewChild('credito') credit:any;
  @ViewChild('relacion') relat:any;
  @ViewChild('inactivo') inact:any;

  
  setInfo(){
    const id = this.num.nativeElement;
    const status = this.status.nativeElement;
    const age = this.age.nativeElement;
    const gender = this.gender.nativeElement;
    const educ = this.educ.nativeElement;
    const inco = this.inco.nativeElement;
    const card = this.card.nativeElement;
    const credit = this.credit.nativeElement;
    const relat = this.relat.nativeElement;
    const inact = this.inact.nativeElement;


    const {CLIENTNUM, Attrition_Flag, Customer_Age, Gender, Education_Level, Income_Category,
      Card_Category, Months_on_book, Months_Inactive_12_mon, Credit_Limit} = this.respuesta;
    
    id.innerHTML=CLIENTNUM;
    status.innerHTML=Attrition_Flag;
    age.innerHTML=Customer_Age;
    gender.innerHTML=Gender;
    educ.innerHTML=Education_Level;
    inco.innerHTML=Income_Category;
    card.innerHTML=Card_Category;
    relat.innerHTML=Months_on_book;
    inact.innerHTML=Months_Inactive_12_mon;
    credit.innerHTML=Credit_Limit;
  };

  /* End section */
  onLogOut():void{
    this.router.navigate(['']);
    this.cookies.deleteAll();
  }

  /* New consult */
  onRefresh():void{
    this.router.navigate(['info']);
  }

  /* post data, to evaluate it and get results */

  @ViewChild('seccion') estadistica: any;
  @ViewChild('figura') figura: any;
  @ViewChild('cluster') cluster: any;
  

  onServicio():void{

    let auth = this.cookies.get('token_access');
    const token = `Bearer ${auth}`;
    const header = new HttpHeaders().set("authorization", token);
    const {CLIENTNUM} = this.respuesta
    console.log('Connecting to microService through bc..');

    /* 'http://localhost:80/evaluate' */
    this.RestService.post2('http://localhost:2400/api/auth/servicio', {CLIENTNUM: CLIENTNUM}, header)
    .subscribe((respuesta :any) => {
        console.log(respuesta);
        
        const fig = this.figura.nativeElement;
        const clus = this.cluster.nativeElement;

        const total = respuesta.AttritedCustomer+ respuesta.ExistingCustomer;
        const blue = Math.floor(respuesta.AttritedCustomer/total*100);
        const red = Math.floor(respuesta.ExistingCustomer/total*100);
        
        console.log(red+" "+blue);

        fig.style.background=`radial-gradient(circle closest-side,transparent 80%,white 0),conic-gradient(#1667bd ${blue}%,#c01313 ${red}%)`;
        clus.innerHTML=`Closter del cliente actual: ${respuesta.KmeasCluster}`;

        const estac = this.estadistica.nativeElement;
        estac.style.visibility='visible';
      },
      (error :any) => {
        console.log('Error: ', error);
      });
  }
  
}
