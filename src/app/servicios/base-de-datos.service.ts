import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import { environment } from 'src/environments/environment';
import { Persona } from '../interfaces';
import { Formacion } from '../interfaces';
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

  getDisciplinas(){
    return this.http.get(`${this.url}disciplina/traer`);
  }
  getProyectos(idPersona: number): Proyecto[] {
    return [
      {
        idProyecto: 0,
        Nombre: "Este mismo proyecto",
        Fecha: new Date("02/01/2022"),
        Descripcion: "string;",
        Enlace: "string;",
        Disciplina: { idDisciplina: 0, Nombre: "Programación" } // *** Aquí solo debería ir el id de la disciplina.
      },
      {
        idProyecto: 1,
        Nombre: "Un proyecyo inventado",
        Fecha: new Date("03/01/2022"),
        Descripcion: "Piripi pipipi",
        Enlace: "Por ahí en interné. Busquelón",
        Disciplina: { idDisciplina: 1, Nombre: "Teatro" } // *** Aquí solo debería ir el id de la disciplina.
      }
    ];
  }
}
