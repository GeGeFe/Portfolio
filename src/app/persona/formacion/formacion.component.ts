import { Component, Input, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Disciplina, iFormacion } from '../../interfaces';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';
import { Formacion } from './formacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {
  @Input() disciplinaActual!: Disciplina;
  @Input() formacionActual!: iFormacion[];
  formacionMostrar!: iFormacion[];
  agregandomodificando: boolean = false;
  public amodificar!: Formacion;

  constructor(public autServicio: AutenticacionService, public bdService: BaseDeDatosService, private ruta: Router) {
  }

  ngOnInit(): void {
  }
  reloadComponent() {
    let currentUrl = this.ruta.url;
    this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ruta.onSameUrlNavigation = 'reload';
    this.ruta.navigate([currentUrl]);
  }

  ngOnChanges(): void {
    this.formacionMostrar = this.formacionActual.filter(f => { return (f.disciplina.id_disciplina == this.disciplinaActual.id_disciplina); });
  }

  btnAgregar(evento: Event): void {
    this.agregandomodificando = true;
  }

  btnModificar(evento: Event, formacion: Formacion): void {
    this.amodificar = formacion;
    this.agregandomodificando = true;
  }

  btnEliminar(evento: Event, formacion: Formacion): void {
    this.bdService.delFormacion(formacion).subscribe();
    this.formacionActual.slice(this.formacionActual.findIndex(x => x == formacion), 1);
    this.agregandomodificando = false;
    this.reloadComponent();
  }

  btnDescartar(evento: Event): void {
    this.agregandomodificando = false;
  }

  recibirformacion(formacion: iFormacion): void {
    if (formacion.id_educacion != undefined) { this.formacionActual.push(formacion); };
    this.agregandomodificando = false;
    this.reloadComponent();
  }
}
