import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { environment } from 'src/environments/environment';
import { Experiencia, Imagen } from '../interfaces';
import { Formacion } from '../interfaces';
import { Proyecto } from '../interfaces';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BaseDeDatosService {
  url = "http://192.168.0.7:8080/";
  headers = new HttpHeaders({
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*'
  });
  constructor(private http: HttpClient) { }

  getPersona(id_Persona: number) { return this.http.get(`${this.url}personas/traer/${id_Persona}`); }

  getDisciplinas() { return this.http.get(`${this.url}disciplina/traer`); }

  delFormacion(formacion: Formacion) { return this.http.delete(`${this.url}formacion/borrar/` + formacion.id_educacion); }

  delExperiencia(experiencia: Experiencia) { return this.http.delete(`${this.url}proyecto/borrar/` + experiencia.id_experiencia); }

  delProyecto(proyecto: Proyecto) { return this.http.delete(`${this.url}proyecto/borrar/` + proyecto.id_proyecto); }

  delImagen(imagen: Imagen) { return this.http.delete(`${this.url}imagen/borrar/` + imagen.id_imagen); }

  setFormacion(formacion: Formacion): Observable<any> {
    let options = { 'headers': this.headers };
    return this.http.post(`${this.url}personas/1/agregarFormacion`, { // Cambiar luego el 1 por personaActual
      id_educacion: formacion.id_educacion,
      tipo: formacion.tipo,
      titulo: formacion.titulo,
      fecha_Inicio: formacion.fecha_Inicio,
      fecha_Final: formacion.fecha_Final,
      logo: formacion.logo,
      institucion: formacion.institucion,
      disciplina: formacion.disciplina
    }
      , options).pipe(map(datos => { return datos; })
      );
  }

  setImagen(imagen: Imagen, id_Proyecto: number): Observable<any> {
    let options = { 'headers': this.headers };
    return this.http.post(`${this.url}proyecto/${id_Proyecto}/agregarImagen`, {
      id_imagen: imagen.id_imagen,
      enlace: imagen.enlace,
      posicion: imagen.posicion,
      titulo: imagen.titulo,
    }
      , options).pipe(map(datos => { return datos; })
      );
  }


  setExperiencia(experiencia: Experiencia): Observable<any> {
    let options = { 'headers': this.headers };
    return this.http.post(`${this.url}personas/1/agregarExperiencia`, { // Cambiar luego el 1 por personaActual
      id_proyecto: experiencia.id_experiencia,
      puesto: experiencia.puesto,
      descripcion_Tareas: experiencia.descripcion_Tareas,
      fecha_Inicio: experiencia.fecha_Inicio,
      fecha_Final: experiencia.fecha_Final,
      logo_Empresa: experiencia.logo_Empresa,
      nombre_Empresa: experiencia.nombre_Empresa,
      disciplina: experiencia.disciplina
    }
      , options).pipe(map(datos => { return datos; })
      );
  }

  setProyecto(proyecto: Proyecto): Observable<any> {
    let options = { 'headers': this.headers };
    return this.http.post(`${this.url}personas/1/agregarProyecto`, { // Cambiar luego el 1 por personaActual
      id_proyecto: proyecto.id_proyecto,
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      fecha_Publicacion: proyecto.fecha_Publicacion,
      enlace: proyecto.enlace,
      disciplina: proyecto.disciplina
    }
      , options).pipe(map(datos => { return datos; })
      );
  }
}
