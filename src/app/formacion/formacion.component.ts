import { Component, Input, OnInit } from '@angular/core';
import { BaseDeDatosService } from '../servicios/base-de-datos.service';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Formacion } from '../interfaces';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {
/*  @Input() idPersona!: number;

  public formacionActual!: Formacion[];

  constructor(public bdService: BaseDeDatosService, public autServicio: AutenticacionService) {
  }

  ngOnInit(): void {
    this.formacionActual = this.bdService.getFormacion(this.idPersona);
  }*/
  @Input() formacionActual!: Formacion[];

  constructor(public autServicio: AutenticacionService) {
  }

  ngOnInit(): void {
  }
}
