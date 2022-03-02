import { Component, OnInit } from '@angular/core';
import { BaseDeDatosService } from '../base-de-datos.service';
import { Formacion } from '../interfaces';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {
  public formacionActual: Formacion[]=      [{
    idFormacion: 0,
    Titulo: "",
    Fecha_Inicio: new Date("01/01/1900"),
    Fecha_Final: new Date("01/02/1900"),
    Logo: "",
    Institucion: ""
  }]
;

  constructor(bdService: BaseDeDatosService) {
    // Falta ver como mierda pasar el id de la parsona actual.
    // *** Habría que hacer que persona sea el componente padre de todos los otros.
    this.formacionActual=bdService.getFormacion(0);
  }

  ngOnInit(): void {

  }

}
