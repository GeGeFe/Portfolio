import { Component, Input, OnInit } from '@angular/core';
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
  proyectosMostrar!: Proyecto[];
  public amodificar!: Proyecto;

  constructor(public autServicio: AutenticacionService, public bdService: BaseDeDatosService, private ruta: Router, public dialog: MatDialog) { }

  ngOnInit(): void { }

  reloadComponent(): void {
    let currentUrl = this.ruta.url;
    this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ruta.onSameUrlNavigation = 'reload';
    this.ruta.navigate([currentUrl]);
  }

  ngOnChanges(): void { this.proyectosMostrar = this.proyectosActual.filter(p => { return (p.disciplina.id_disciplina == this.disciplinaActual.id_disciplina); }); }

  btnModificar(evento: Event, proyecto: Proyecto): void {
    this.amodificar = proyecto;
    this.abrirDialogo()
  }

  btnEliminar(evento: Event, proyecto: Proyecto): void {
    if (confirm("¿Realmente quiere borrar este proyecto?")) {
      this.bdService.delProyecto(proyecto).subscribe(p => {
        this.reloadComponent();
      });
      this.proyectosActual.slice(this.proyectosActual.findIndex(x => x == proyecto), 1);
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
        this.proyectosActual.push(proyecto);
        proyecto.id_proyecto = 0;
      }
      if (proyecto.id_proyecto != undefined) {
        this.bdService.setProyecto(proyecto, this.id_persona).subscribe();
      };
      this.reloadComponent(); 
    });
  }
}
