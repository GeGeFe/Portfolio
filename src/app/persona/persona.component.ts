import { Component, OnInit, Output } from '@angular/core';
import { BaseDeDatosService } from '../servicios/base-de-datos.service';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Disciplina, Formacion, Persona } from '../interfaces';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  public personaActual!: Persona;
  public formacionActual: Formacion[] = [];
  public disciplinas: Disciplina[] = [];

  constructor(public bdService: BaseDeDatosService, public autServicio: AutenticacionService) {
  }

  ngOnInit(): void {
    this.bdService.getPersona(1).subscribe((datos: any) => {
      // ¿Por qué me obliga a hacer chanchadas como esta y no reconoce directamente datos.idperson, etc.?
      this.personaActual = {
        idPersona: JSON.parse(JSON.stringify(datos)).idpersona,
        Nombre: JSON.parse(JSON.stringify(datos)).nombre,
        Apellido: JSON.parse(JSON.stringify(datos)).apellido,
        Fecha_Nacimiento: JSON.parse(JSON.stringify(datos)).fecha_Nacimiento,
        Banner: JSON.parse(JSON.stringify(datos)).banner,
        Avatar: JSON.parse(JSON.stringify(datos)).avatar,
        Acerca_de: JSON.parse(JSON.stringify(datos)).acerca_de
      }
      this.formacionActual = JSON.parse(JSON.stringify(datos)).formacion;
    });
    console.log("Ando por aquí.");
    this.bdService.getDisciplinas().subscribe((datos) => {
      this.disciplinas = JSON.parse(JSON.stringify(datos))
      console.log(this.disciplinas);
    });
  }
}
