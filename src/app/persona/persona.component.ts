import { Component, OnInit } from '@angular/core';
import { BaseDeDatosService } from '../servicios/base-de-datos.service';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Persona } from '../interfaces';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  public personaActual!: Persona;

  constructor(public bdService: BaseDeDatosService, public autServicio: AutenticacionService) {
  }

  ngOnInit(): void {
    this.bdService.getPersona(1).subscribe(datos => {
      this.personaActual = {
        idPersona: JSON.parse(JSON.stringify(datos)).idpersona,
        Nombre: JSON.parse(JSON.stringify(datos)).nombre,
        Apellido: JSON.parse(JSON.stringify(datos)).apellido,
        Fecha_Nacimiento: JSON.parse(JSON.stringify(datos)).fecha_Nacimiento,
        Banner: JSON.parse(JSON.stringify(datos)).banner,
        Avatar: JSON.parse(JSON.stringify(datos)).avatar,
        Acerca_de: JSON.parse(JSON.stringify(datos)).acerca_de
      }
    });
  }
}
