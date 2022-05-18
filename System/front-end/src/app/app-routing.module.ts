import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { VigilanteGuard } from './vigilante.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'info',component:ClienteComponent, canActivate:[VigilanteGuard]},
  {path:'cliente', component:InfoComponent, canActivate:[VigilanteGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
