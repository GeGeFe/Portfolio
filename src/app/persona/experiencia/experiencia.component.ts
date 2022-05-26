import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Disciplina, Experiencia } from 'src/app/interfaces';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';
import { EditexperienciaComponent } from './editexperiencia/editexperiencia.component';
@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  @Input() disciplinaActual!: Disciplina;
  @Input() experienciaActual!: Experiencia[];
  experienciaMostrar!: Experiencia[];
  public amodificar!: Experiencia;

  constructor(public autServicio: AutenticacionService, public bdService: BaseDeDatosService, private ruta: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  reloadComponent(): void {
    let currentUrl = this.ruta.url;
    this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ruta.onSameUrlNavigation = 'reload';
    this.ruta.navigate([currentUrl]);
  }

  ngOnChanges(): void {
    this.ActualizarMuestra();
  }

  ActualizarMuestra(): void {
    this.experienciaMostrar = this.experienciaActual.filter(e => { return (e.disciplina.id_disciplina == this.disciplinaActual.id_disciplina); });
  }

  btnModificar(evento: Event, experiencia: Experiencia): void {
    this.amodificar = experiencia;
    this.abrirDialogo()
    this.ActualizarMuestra();
    this.reloadComponent();
  }

  btnEliminar(evento: Event, experiencia: Experiencia): void {
    if (confirm("¿Realmente quiere borrar esta experiencia?")) {
      this.bdService.delExperiencia(experiencia).subscribe();
      this.experienciaActual.slice(this.experienciaActual.findIndex(x => x == experiencia), 1);
      this.ActualizarMuestra();
      this.reloadComponent();
    }
  }

  abrirDialogo(): void {
    const dialogoConfig = new MatDialogConfig();
    
    dialogoConfig.disableClose= true;
    dialogoConfig.autoFocus=true;
    console.log(this.amodificar.id_experiencia);
    dialogoConfig.data=(this.amodificar != undefined) ? {
      id_experiencia: this.amodificar.id_experiencia,
      puesto: this.amodificar.puesto,
      descripcion_Tareas: this.amodificar.descripcion_Tareas,
      nombre_Empresa: this.amodificar.nombre_Empresa,
      logo_Empresa: this.amodificar.logo_Empresa,
      fecha_Inicio: this.amodificar.fecha_Inicio,
      fecha_Final: this.amodificar.fecha_Final,
      disciplina: this.amodificar.disciplina
    } : {};
    console.log(dialogoConfig.data);

    const dialogo = this.dialog.open(EditexperienciaComponent, dialogoConfig);

    dialogo.afterClosed().subscribe(experiencia => {
      experiencia.disciplina = this.disciplinaActual;
      if (experiencia.id_experiencia == undefined) {
        this.experienciaActual.push(experiencia); // Si es una experiencia nueva se agrega al array y se define como 0 para que se cree un id nuevo en el backend.
        experiencia.id_experiencia = 0;
      }
      if (experiencia.id_experiencia != undefined) {
        this.bdService.setExperiencia(experiencia).subscribe();
      };
    });
    this.ActualizarMuestra();
    this.reloadComponent();
  }
}