import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { environment } from 'src/environments/environment';
import { Experiencia, Persona } from '../interfaces';
import { iFormacion } from '../interfaces';
import { Proyecto } from '../interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {
  url = "http://192.168.0.7:8080/";
  constructor(private http: HttpClient) {
  }

  getPersona(idPersona: number) {
    return this.http.get(`${this.url}personas/traer/${idPersona}`);
  }

  getDisciplinas() {
    return this.http.get(`${this.url}disciplina/traer`);
  }

  delFormacion(formacion: iFormacion) {
    return this.http.delete(`${this.url}formacion/borrar/` + formacion.id_educacion);
  }

  delExperiencia(experiencia: Experiencia) {
    return this.http.delete(`${this.url}experiencia/borrar/` + experiencia.id_experiencia);
  }

  setFormacion(formacion: iFormacion): Observable<any> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    });
    let options = { 'headers': headers };
    return this.http.post(`${this.url}personas/1/agregarFormacion`, { // Cambiar luego el 1 por personaActual
      id_educacion: formacion.id_educacion,
      tipo: formacion.tipo,
      titulo: formacion.titulo,
      fecha_Inicio: formacion.fecha_Inicio.getFullYear() + "-" + formacion.fecha_Inicio.getMonth().toString().padStart(2, "0") + "-" + formacion.fecha_Inicio.getDay().toString().padStart(2, "0"),
      fecha_Final: formacion.fecha_Final.getFullYear() + "-" + formacion.fecha_Final.getMonth().toString().padStart(2, "0") + "-" + formacion.fecha_Final.getDay().toString().padStart(2, "0"),
      logo: formacion.logo,
      institucion: formacion.institucion,
      disciplina: formacion.disciplina
    }
      , options).pipe(map(datos => { return datos; })
      );
  }

  setExperiencia(experiencia: Experiencia): Observable<any> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    });
    let options = { 'headers': headers };
    return this.http.post(`${this.url}personas/1/agregarExperiencia`, { // Cambiar luego el 1 por personaActual
      id_experiencia: experiencia.id_experiencia,
      puesto: experiencia.puesto,
      descripcion_Tareas: experiencia.descripcion_Tareas,
//      fecha_Inicio: experiencia.fecha_Inicio.getFullYear() + "-" + experiencia.fecha_Inicio.getMonth().toString().padStart(2, "0") + "-" + experiencia.fecha_Inicio.getDay().toString().padStart(2, "0"),
//      fecha_Final: experiencia.fecha_Final.getFullYear() + "-" + experiencia.fecha_Final.getMonth().toString().padStart(2, "0") + "-" + experiencia.fecha_Final.getDay().toString().padStart(2, "0"),
      fecha_Inicio: experiencia.fecha_Inicio,
      fecha_Final: experiencia.fecha_Final,
      logo_Empresa: experiencia.logo_Empresa,
      nombre_Empresa: experiencia.nombre_Empresa,
      disciplina: experiencia.disciplina
    }
      , options).pipe(map(datos => { return datos; })
      );
  }

  getProyectos(idPersona: number): Proyecto[] {
    return [
      {
        idProyecto: 0,
        nombre: "Este mismo proyecto",
        fecha: new Date("02/01/2022"),
        descripcion: "Fue un quilombo pero quedó bonito. ¿No?",
        enlace: "string;",
        disciplina: { id_disciplina: 1, nombre: "Computación" }
      },
      {
        idProyecto: 1,
        nombre: "Un proyecyo inventado",
        fecha: new Date("03/01/2022"),
        descripcion: "Piripi pipipi",
        enlace: "Por ahí en interné. Busquelón",
        disciplina: { id_disciplina: 1, nombre: "Computación" }
      }
    ];
  }
}
