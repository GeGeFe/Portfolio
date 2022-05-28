import { Component, OnInit, Output } from '@angular/core';
import { BaseDeDatosService } from '../servicios/base-de-datos.service';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Disciplina, Experiencia, Formacion, Habilidad, Persona, Proyecto } from '../interfaces';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  public personaActual!: Persona;
  public formacionActual: Formacion[] = [];
  public experienciaActual: Experiencia[] = [];
  public proyectosActual: Proyecto[] = [];
  public disciplinas: Disciplina[] = [];
  public habilidadesActual: Habilidad[] = [];
  public disciplinaActual!: Disciplina;
  srcResult: any;

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
      this.experienciaActual = JSON.parse(JSON.stringify(datos)).experiencia;
      this.proyectosActual = JSON.parse(JSON.stringify(datos)).proyectos;
      this.habilidadesActual = JSON.parse(JSON.stringify(datos)).habilidades;
    });
    this.bdService.getDisciplinas().subscribe((datos) => {
      this.disciplinas = JSON.parse(JSON.stringify(datos))
    });

    // *** Solo para probar ***
    //   this.proyectosActual=this.bdService.getProyectos(1);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}

