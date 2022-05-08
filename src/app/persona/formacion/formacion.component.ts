import { Component, Input, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Disciplina, iFormacion } from '../../interfaces';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {
  @Input() disciplinaActual!: Disciplina;
  @Input() formacionActual!: iFormacion[];
  formacionMostrar!: iFormacion[];
  editando: boolean = false;
  agregando: boolean = false;

  constructor(public autServicio: AutenticacionService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.formacionMostrar = this.formacionActual.filter(f => { return (f.disciplina.id_disciplina == this.disciplinaActual.id_disciplina); });
  }

  btnAgregar(evento: Event): void {
    this.agregando = true;
  }
  btnDescartar(evento: Event): void {
    this.agregando = false;
  }
  recibirformacion(formacion:iFormacion): void {
    this.formacionActual.push(formacion);
    this.agregando = false;
    this.ngOnInit();
  }
}
