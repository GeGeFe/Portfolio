import { Component, OnInit } from '@angular/core';
import { BaseDeDatosService } from '../servicios/base-de-datos.service';
import { Persona } from '../interfaces';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  public personaActual: Persona = {
    idPersona: 0,
    Nombre: "",
    Apellido: "",
    Fecha_Nacimiento: new Date("01/01/1901"),
    Banner: "",
    Avatar: "",
    Acerca_de: ""
  };

  constructor(bdService: BaseDeDatosService) {
    this.personaActual = bdService.getPersona();
  }

  ngOnInit(): void {
  }

}
