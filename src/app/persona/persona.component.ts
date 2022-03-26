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
    this.personaActual = bdService.getPersona();
  }

  ngOnInit(): void {
  }

}
