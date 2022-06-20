import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { environment } from 'src/environments/environment';
import { Experiencia, Habilidad, Imagen, Persona } from '../interfaces';
import { Formacion } from '../interfaces';
import { Proyecto } from '../interfaces';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BaseDeDatosService {
  //  url = "http://192.168.0.7:8080/";
  url = "https://frozen-depths-03746.herokuapp.com/"
  headers = new HttpHeaders({
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*'
  });
  constructor(private http: HttpClient) { }

  getPersona(id_persona: number) { return this.http.get(`${this.url}personas/traer/${id_persona}`); }

  getDisciplinas() { return this.http.get(`${this.url}disciplina/traer`); }

  delFormacion(formacion: Formacion) { return this.http.delete(`${this.url}formacion/borrar/` + formacion.id_educacion); }

  delExperiencia(experiencia: Experiencia) { return this.http.delete(`${this.url}experiencia/borrar/` + experiencia.id_experiencia); }

  delProyecto(proyecto: Proyecto) { return this.http.delete(`${this.url}proyecto/borrar/` + proyecto.id_proyecto); }

  delImagen(imagen: Imagen) { return this.http.delete(`${this.url}imagen/borrar/` + imagen.id_imagen); }

  delHabilidad(habilidad: Habilidad) { return this.http.delete(`${this.url}habilidad/borrar/` + habilidad.id_habilidad); }

  setFormacion(formacion: Formacion, id_persona: number): Observable<any> {
    let options = { 'headers': this.headers };
    return this.http.post(`${this.url}personas/${id_persona}/agregarFormacion`, { // Cambiar luego el 1 por personaActual
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

  setExperiencia(experiencia: Experiencia, id_persona: number): Observable<any> {
    let options = { 'headers': this.headers };
    return this.http.post(`${this.url}personas/${id_persona}/agregarExperiencia`, { // Cambiar luego el 1 por personaActual
      id_experiencia: experiencia.id_experiencia,
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

  setProyecto(proyecto: Proyecto, id_persona: number): Observable<any> {
    let options = { 'headers': this.headers };
    return this.http.post(`${this.url}personas/${id_persona}/agregarProyecto`, { // Cambiar luego el 1 por personaActual
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

  setHabilidad(habilidad: Habilidad, id_persona: number): Observable<any> {
    let options = { 'headers': this.headers };
    return this.http.post(`${this.url}personas/${id_persona}/agregarHabilidad`, { // Cambiar luego el 1 por personaActual
      id_habilidad: habilidad.id_habilidad,
      nombre: habilidad.nombre,
      porcentaje: habilidad.porcentaje,
      tipo: habilidad.tipo
    }
      , options).pipe(map(datos => { return datos; })
      );
  }

  setPersona(persona: Persona): Observable<any> {
    let options = { 'headers': this.headers };
    return this.http.post(`${this.url}personas/editar/${persona.id_persona}`, {
      id_persona: persona.id_persona,
      nombre: persona.nombre,
      apellido: persona.apellido,
      acerca_de: persona.acerca_de,
      avatar: persona.avatar,
      banner: persona.banner,
      fecha_Nacimiento: persona.fecha_Nacimiento,
    }
      , options).pipe(map(datos => { return datos; })
      );
  }
}
