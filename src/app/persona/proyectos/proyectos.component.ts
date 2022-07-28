import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router } from '@angular/router';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';
import { Disciplina, Proyecto } from 'src/app/interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditproyectoComponent } from './editproyecto/editproyecto.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  @Input() disciplinaActual!: Disciplina;
  @Input() proyectosActual!: Proyecto[];
  @Input() id_persona!: number;
  @Output() proyectoModificado = new EventEmitter<Proyecto[]>();

  proyectosMostrar!: Proyecto[];
  public amodificar!: Proyecto;

  constructor(public autServicio: AutenticacionService, public bdService: BaseDeDatosService, private ruta: Router, public dialog: MatDialog) { }

  ngOnInit(): void { }

  reloadComponent(): void { this.proyectoModificado.emit(this.proyectosActual); }

  ngOnChanges(): void {
    this.proyectosMostrar = this.proyectosActual.filter(
      p => { return (p.disciplina.id_disciplina == this.disciplinaActual.id_disciplina); }
      ).sort((a, b) => {
        console.log(new Date(a.fecha_Publicacion).getTime());
        if (new Date(a.fecha_Publicacion).getTime() > new Date(b.fecha_Publicacion).getTime()) { return -1; };
        if (new Date(a.fecha_Publicacion).getTime() < new Date(b.fecha_Publicacion).getTime()) { return 1; };
        return 0;
      });
  }

  btnModificar(evento: Event, proyecto: Proyecto): void {
    this.amodificar = proyecto;
    this.abrirDialogo()
  }

  btnEliminar(evento: Event, proyecto: Proyecto): void {
    if (confirm("¿Realmente quiere borrar este proyecto?")) {
      this.proyectosActual.slice(this.proyectosActual.findIndex(x => x == proyecto), 1);
      this.bdService.delProyecto(proyecto).subscribe(p => {
        this.reloadComponent();
      });
    }
  }

  abrirDialogo(): void {
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.disableClose = true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.data = (this.amodificar != undefined) ? {
      id_proyecto: this.amodificar.id_proyecto,
      nombre: this.amodificar.nombre,
      fecha_Publicacion: this.amodificar.fecha_Publicacion,
      descripcion: this.amodificar.descripcion,
      enlace: this.amodificar.enlace,
      disciplina: this.amodificar.disciplina,
    } : {};
    const dialogo = this.dialog.open(EditproyectoComponent, dialogoConfig);

    dialogo.afterClosed().subscribe(proyecto => {
      proyecto.disciplina = this.disciplinaActual;
      if (proyecto.id_proyecto == undefined) {
        // Proyecto nuevo
        proyecto.id_proyecto = 0;
        this.proyectosActual.push(proyecto);
      } else {
        // Proyecto existente
        this.proyectosActual[this.proyectosActual.findIndex(x => x == this.amodificar)] = proyecto;
      }
      if (proyecto.id_proyecto != undefined) {
        this.bdService.setProyecto(proyecto, this.id_persona).subscribe(p => { this.reloadComponent(); });
      };
    });
  }
}
