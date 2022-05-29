import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CabeceraComponent } from './cabecera/cabecera.component';
import { PersonaComponent } from './persona/persona.component';
import { ExperienciaComponent } from './persona/experiencia/experiencia.component';
import { ProyectosComponent } from './persona/proyectos/proyectos.component';
import { FormacionComponent } from './persona/formacion/formacion.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BaseDeDatosService } from './servicios/base-de-datos.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SesionComponent } from './sesion/sesion.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { interceptorProvider } from './servicios/interceptor.service';
import { MaterialModule } from './material.module';
import { EditformacionComponent } from './persona/formacion/editformacion/editformacion.component';
import { EditexperienciaComponent } from './persona/experiencia/editexperiencia/editexperiencia.component';
import { HabilidadesComponent } from './persona/habilidades/habilidades.component';
import { EditproyectoComponent } from './persona/proyectos/editproyecto/editproyecto.component';
import { ImagenesComponent } from './persona/proyectos/imagenes/imagenes.component';
import { EditimagenComponent } from './persona/proyectos/imagenes/editimagen/editimagen.component';
import { EdithabilidadComponent } from './persona/habilidades/edithabilidad/edithabilidad.component';
import { EditpersonaComponent } from './persona/editpersona/editpersona.component';



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
    SesionComponent,
    EditformacionComponent,
    EditexperienciaComponent,
    HabilidadesComponent,
    EditproyectoComponent,
    ImagenesComponent,
    EditimagenComponent,
    EdithabilidadComponent,
    EditpersonaComponent
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
