import { Component, Input, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Formacion } from '../../interfaces';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {
  @Input() disciplinaActual!: number;
  @Input() formacionActual!: Formacion[];
  formacionMostrar!: Formacion[];
  editando: boolean = false;
  agregando: boolean = false;

  constructor(public autServicio: AutenticacionService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.formacionMostrar = this.formacionActual.filter(f => { return (f.disciplina.id_disciplina == this.disciplinaActual); });
  }

  btnAgregar(evento: Event): void {
    this.agregando = true;
  }
  btnDescartar(evento: Event): void {
    this.agregando = false;
  }
  btnEnviar(evento: Event): void{
    
  }
}
