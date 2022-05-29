import { Component, Input, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';
import { Disciplina, Experiencia } from 'src/app/interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditexperienciaComponent } from './editexperiencia/editexperiencia.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  @Input() disciplinaActual!: Disciplina;
  @Input() experienciaActual!: Experiencia[];
  @Input() id_persona!: number;
  experienciaMostrar!: Experiencia[];
  public amodificar!: Experiencia;

  constructor(public autServicio: AutenticacionService, public bdService: BaseDeDatosService, private ruta: Router, public dialog: MatDialog) { }

  ngOnInit(): void { }

  reloadComponent(): void {
    let currentUrl = this.ruta.url;
    this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ruta.onSameUrlNavigation = 'reload';
    this.ruta.navigate([currentUrl]);
  }

  ngOnChanges(): void { this.experienciaMostrar = this.experienciaActual.filter(e => { return (e.disciplina.id_disciplina == this.disciplinaActual.id_disciplina); }); }

  btnModificar(evento: Event, experiencia: Experiencia): void {
    this.amodificar = experiencia;
    this.abrirDialogo()
  }

  btnEliminar(evento: Event, experiencia: Experiencia): void {
    if (confirm("¿Realmente quiere borrar esta experiencia?")) {
      this.bdService.delExperiencia(experiencia).subscribe(e => {
        this.reloadComponent();
      });
      this.experienciaActual.slice(this.experienciaActual.findIndex(x => x == experiencia), 1);
    }
  }

  abrirDialogo(): void {
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.disableClose = true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.data = (this.amodificar != undefined) ? {
      id_experiencia: this.amodificar.id_experiencia,
      puesto: this.amodificar.puesto,
      descripcion_Tareas: this.amodificar.descripcion_Tareas,
      nombre_Empresa: this.amodificar.nombre_Empresa,
      logo_Empresa: this.amodificar.logo_Empresa,
      fecha_Inicio: this.amodificar.fecha_Inicio,
      fecha_Final: this.amodificar.fecha_Final,
      disciplina: this.amodificar.disciplina
    } : {};

    const dialogo = this.dialog.open(EditexperienciaComponent, dialogoConfig);

    dialogo.afterClosed().subscribe(experiencia => {
      experiencia.disciplina = this.disciplinaActual;
      if (experiencia.id_experiencia == undefined) {
        this.experienciaActual.push(experiencia);
        experiencia.id_experiencia = 0;
      }
      if (experiencia.id_experiencia != undefined) {
        this.bdService.setExperiencia(experiencia, this.id_persona).subscribe();
      };
      this.reloadComponent();
    });
  }
}