import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CabeceraComponent } from './cabecera/cabecera.component';
import { PersonaComponent } from './persona/persona.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { FormacionComponent } from './formacion/formacion.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BaseDeDatosService } from './servicios/base-de-datos.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SesionComponent } from './sesion/sesion.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { interceptorProvider } from './sesion/interceptor.service';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PersonaComponent,
    ExperienciaComponent,
    ProyectosComponent,
    FormacionComponent,
    HomeComponent,
    NotfoundComponent,
    SesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [BaseDeDatosService, AutenticacionService, interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
