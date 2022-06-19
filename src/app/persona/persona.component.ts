import { Component, Input, OnInit, Output } from '@angular/core';
import { BaseDeDatosService } from '../servicios/base-de-datos.service';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Disciplina, Experiencia, Formacion, Habilidad, Persona, Proyecto } from '../interfaces';
import { Router } from '@angular/router';
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
  srcResult: any;

  constructor(public bdService: BaseDeDatosService, public autServicio: AutenticacionService, private ruta: Router, public dialog: MatDialog) { }

  reloadComponent(): void {
    let currentUrl = this.ruta.url;
    this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ruta.onSameUrlNavigation = 'reload';
    this.ruta.navigate([currentUrl]);
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
        acerca_de: datos.acerca_de
      }
      this.formacionActual = datos.formacion;
      this.experienciaActual = datos.experiencia;
      this.proyectosActual = datos.proyectos;
      this.habilidadesActual = datos.habilidades;
    });
    this.bdService.getDisciplinas().subscribe((datos) => {
      this.disciplinas = JSON.parse(JSON.stringify(datos))
    });
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
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
      banner: this.personaActual.banner
    };
    console.log(this.personaActual.id_persona);
    console.log(JSON.stringify(dialogoConfig.data));
    const dialogo = this.dialog.open(EditpersonaComponent, dialogoConfig);

    dialogo.afterClosed().subscribe(persona => {
      this.bdService.setPersona(persona).subscribe();
      this.reloadComponent();
    });
  }
  recibirProyectos(proyectos: Proyecto[]){
    this.proyectosActual=proyectos;
    this.reloadComponent();
  }
}

