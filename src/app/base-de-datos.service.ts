import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http'
//import { environment } from 'src/environments/environment';
import { Persona } from './interfaces';
import { Formacion } from './interfaces';
import { Proyecto } from './interfaces';
import { Disciplina } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {
  //  baseUrl = environment.baseUrl;

  //  constructor(private http: HttpClient) { }

  constructor() { }

  getPersona(): Persona {
    return {
      idPersona: 0,
      Nombre: "Gabriel",
      Apellido: "Gioiosa Farina",
      Fecha_Nacimiento: new Date("09/17/1980"),
      Banner: "./assets/img/nave.jpg",
      Avatar: "./assets/img/Alpha a Logo (Trazado de partículas).jpg",
      Acerca_de: "Este pibe es re laburador y se la pasa aprendiendo cosas nuevas. Contratelón que les va venir bárbaro."
    };
  }
  getFormacion(idPersona: number): Formacion[] {
    return [
      {
        idFormacion: 0,
        Titulo: "Educación primaria",
        Fecha_Inicio: new Date("03/01/1987"),
        Fecha_Final: new Date("12/31/1993"),
        Logo: "",
        Institucion: "Colegio San Pedro"
      },
      {
        idFormacion: 1,
        Titulo: "Educación secundaria",
        Fecha_Inicio: new Date("03/01/1994"),
        Fecha_Final: new Date("12/31/2000"),
        Logo: "",
        Institucion: "ENET N1"
      }
    ];
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
