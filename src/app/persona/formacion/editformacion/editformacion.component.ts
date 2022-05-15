import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
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
  @Input() formacion!: Formacion;
  @Output() nuevaformacion = new EventEmitter<iFormacion>();
  tipoformacion = TiposFormacion;
  unaformacion!: FormGroup;

  constructor(public FormBuilder: FormBuilder, public bdService: BaseDeDatosService) {
  }


  getTitulo() {
    return this.unaformacion.get("titulo");
  }
  getTipo() {
    return this.unaformacion.get("tipo");
  }
  getFInicio() {
    return this.unaformacion.get("fecha_inicio");
  }
  getFFinal() {
    return this.unaformacion.get("fecha_final");
  }
  getLogo() {
    return this.unaformacion.get("logo");
  }
  getInstitucion() {
    return this.unaformacion.get("institucion");
  }

  guardarFormacion(evento: Event) {
    if (this.formacion == undefined) {
      this.formacion = new Formacion(
        0,
        this.unaformacion.value.tipo,
        this.unaformacion.value.titulo,
        this.unaformacion.value.fecha_inicio,
        this.unaformacion.value.fecha_final,
        this.unaformacion.value.logo,
        this.unaformacion.value.institucion,
        this.disciplinaActual)
    } else {
      this.formacion.tipo = this.unaformacion.value.tipo;
      this.formacion.titulo = this.unaformacion.value.titulo;
      this.formacion.fecha_Inicio = this.unaformacion.value.fecha_inicio;
      this.formacion.fecha_Final = this.unaformacion.value.fecha_final;
      this.formacion.logo = this.unaformacion.value.logo;
      this.formacion.institucion = this.unaformacion.value.institucion;
      this.formacion.disciplina = this.disciplinaActual;
    }
    this.bdService.setFormacion(this.formacion).subscribe();
    this.nuevaformacion.emit(this.formacion);
  }

  ngOnInit(): void {
    this.unaformacion = this.FormBuilder.group(
      {
        tipo: [this.formacion != undefined ? this.formacion.tipo : TiposFormacion.Curso_Capacitación, [Validators.required]],
        titulo: [this.formacion != undefined ? this.formacion.titulo : '', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\\s]*')]],
        fecha_inicio: [this.formacion != undefined ? new Date(this.formacion.fecha_Inicio) : '', [Validators.required]],
        fecha_final: [this.formacion != undefined ? new Date(this.formacion.fecha_Final) : '', [Validators.required]],
        logo: [this.formacion != undefined ? this.formacion.logo : '', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
        institucion: [this.formacion != undefined ? this.formacion.institucion : '', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\\s]*')]]
      }
    )
  }
}
