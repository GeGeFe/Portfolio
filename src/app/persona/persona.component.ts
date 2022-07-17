import { Component, Input, OnInit } from '@angular/core';
import { BaseDeDatosService } from '../servicios/base-de-datos.service';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Disciplina, Experiencia, Formacion, Habilidad, Persona, Proyecto } from '../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditpersonaComponent } from './editpersona/editpersona.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  @Input() id_persona!: number;
  public personaActual!: Persona;
  public formacionActual: Formacion[] = [];
  public experienciaActual: Experiencia[] = [];
  public proyectosActual: Proyecto[] = [];
  public disciplinas: Disciplina[] = [];
  public habilidadesActual: Habilidad[] = [];
  public disciplinaActual!: Disciplina;
  public edad!: number;
  public seleccion!: number;

  constructor(public bdService: BaseDeDatosService,
    public autServicio: AutenticacionService,
    private router: Router,
    private ruta: ActivatedRoute,
    public dialog: MatDialog) { }

  reloadComponent(): void {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  ngOnInit(): void {
    this.bdService.getPersona(this.id_persona).subscribe((datos: any) => {
      this.personaActual = {
        id_persona: datos.id_persona,
        nombre: datos.nombre,
        apellido: datos.apellido,
        fecha_Nacimiento: datos.fecha_Nacimiento,
        banner: datos.banner,
        avatar: datos.avatar,
        acerca_de: datos.acerca_de,
        contacto: datos.contacto
      }
      this.formacionActual = datos.formacion;
      this.experienciaActual = datos.experiencia;
      this.proyectosActual = datos.proyectos;
      this.habilidadesActual = datos.habilidades;
      this.edad = this.calcularEdad(new Date(this.personaActual.fecha_Nacimiento));
    });
    this.bdService.getDisciplinas().subscribe((datos) => {
      this.disciplinas = JSON.parse(JSON.stringify(datos))
    });
    this.seleccion = this.ruta.snapshot.params['seleccion'];
  }

  calcularEdad(fecha: Date): number { // Sin contar meses.
    let hoy = new Date();
    return hoy.getFullYear() - fecha.getFullYear();
  }

  abrirDialogo(evento: Event): void {
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.disableClose = true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.data = {
      id_persona: this.personaActual.id_persona,
      nombre: this.personaActual.nombre,
      apellido: this.personaActual.apellido,
      fecha_Nacimiento: this.personaActual.fecha_Nacimiento,
      acerca_de: this.personaActual.acerca_de,
      avatar: this.personaActual.avatar,
      banner: this.personaActual.banner,
      contacto: this.personaActual.contacto
    };
    const dialogo = this.dialog.open(EditpersonaComponent, dialogoConfig);

    dialogo.afterClosed().subscribe(persona => {
      this.personaActual = persona;
      this.bdService.setPersona(persona).subscribe(p => {
        this.reloadComponent();
      });
    });
  }

  recibirProyectos(proyectos: Proyecto[]) {
    this.proyectosActual = proyectos;
    this.reloadComponent();
  }

  recibirExperiencia(experiencias: Experiencia[]) {
    this.experienciaActual = experiencias;
    this.reloadComponent();
  }

  recibirFormacion(formaciones: Formacion[]) {
    this.formacionActual = formaciones;
    this.reloadComponent();
  }

  recibirHabilidades(habilidades: Habilidad[]) {
    this.habilidadesActual = habilidades;
    this.reloadComponent();
  }
}

