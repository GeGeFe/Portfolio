import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Disciplina, iFormacion } from 'src/app/interfaces';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';
import { Formacion } from '../formacion';
import { TiposFormacion } from '../tiposformacion';

@Component({
  selector: 'app-editformacion',
  templateUrl: './editformacion.component.html',
  styleUrls: ['./editformacion.component.css']
})
export class EditformacionComponent implements OnInit {
  @Input() disciplinaActual!: Disciplina;
  tipoformacion = TiposFormacion;
  //@Input() formacionActual!: Formacion[];
  formacion!: Formacion;
  @Output() nuevaformacion = new EventEmitter<iFormacion>();

  unaformacion: FormGroup;
  constructor(private FormBuilder: FormBuilder, public bdService: BaseDeDatosService) {
    this.unaformacion = this.FormBuilder.group(
      {
        tipo: [TiposFormacion.Curso_Capacitación, [Validators.required]],
        titulo: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\\s]*')]],
        fecha_inicio: ['', [Validators.required]],
        fecha_final: ['', [Validators.required]],
        logo: ['', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
        institucion: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\\s]*')]]
      }
    )
  }

  getTitulo(){
    return this.unaformacion.get("titulo");
  }
  getTipo(){
    return this.unaformacion.get("tipo");
  }
  getFInicio(){
    return this.unaformacion.get("fecha_inicio");
  }
  getFFinal(){
    return this.unaformacion.get("fecha_final");
  }
  getLogo(){
    return this.unaformacion.get("logo");
  }
  getInstitucion(){
    return this.unaformacion.get("institucion");
  }

  guardarFormacion(evento: Event) {
    this.formacion = new Formacion(
      0,
      this.unaformacion.value.tipo,
      this.unaformacion.value.titulo,
      this.unaformacion.value.fecha_inicio,
      this.unaformacion.value.fecha_final,
      this.unaformacion.value.logo,
      this.unaformacion.value.institucion,
      this.disciplinaActual)

    this.bdService.setFormacion(this.formacion);
    this.nuevaformacion.emit(this.formacion);
  }
  ngOnInit(): void {
  }

}
