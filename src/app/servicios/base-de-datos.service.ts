import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import { environment } from 'src/environments/environment';
import { Persona } from '../interfaces';
import { iFormacion } from '../interfaces';
import { Proyecto } from '../interfaces';
import { Observable } from 'rxjs';

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
  setFormacion(formacion: iFormacion): Observable<any> {
    return this.http.post(`${this.url}formacion/crear`, JSON.stringify(formacion));
  }

  getProyectos(idPersona: number): Proyecto[] {
    return [
      {
        idProyecto: 0,
        nombre: "Este mismo proyecto",
        fecha: new Date("02/01/2022"),
        descripcion: "string;",
        enlace: "string;",
        disciplina: { id_disciplina: 0, nombre: "Programación" } // *** Aquí solo debería ir el id de la disciplina.
      },
      {
        idProyecto: 1,
        nombre: "Un proyecyo inventado",
        fecha: new Date("03/01/2022"),
        descripcion: "Piripi pipipi",
        enlace: "Por ahí en interné. Busquelón",
        disciplina: { id_disciplina: 1, nombre: "Teatro" } // *** Aquí solo debería ir el id de la disciplina.
      }
    ];
  }
}
