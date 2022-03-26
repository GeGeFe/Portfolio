import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SesionComponent } from './sesion/sesion.component';

const routes: Routes = [
  {path:'login', component: SesionComponent},
  {path:'sesion', component: SesionComponent},
  {path:'logout', component: SesionComponent},
  {path:'',component: HomeComponent},
  {path:'**',component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
