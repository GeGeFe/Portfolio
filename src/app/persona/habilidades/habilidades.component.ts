import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Habilidad } from "src/app/interfaces";
import { AutenticacionService } from "src/app/servicios/autenticacion.service";
import { BaseDeDatosService } from "src/app/servicios/base-de-datos.service";
import { EdithabilidadComponent } from "./edithabilidad/edithabilidad.component";

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  @Input() habilidadesActual!: Habilidad[];
  habilidadesMostrar!: Habilidad[];
  public amodificar!: Habilidad;

  constructor(public autServicio: AutenticacionService, public bdService: BaseDeDatosService, private ruta: Router, public dialog: MatDialog) { }

  ngOnInit(): void { }

  reloadComponent(): void {
    let currentUrl = this.ruta.url;
    this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ruta.onSameUrlNavigation = 'reload';
    this.ruta.navigate([currentUrl]);
  }

  ngOnChanges(): void { this.habilidadesMostrar = this.habilidadesActual; }

  btnModificar(evento: Event, habilidad: Habilidad): void {
    this.amodificar = habilidad;
    this.abrirDialogo()
  }

  btnEliminar(evento: Event, habilidad: Habilidad): void {
    if (confirm("¿Realmente quiere borrar esta habilidad?")) {
      this.bdService.delHabilidad(habilidad).subscribe(f => {
        this.reloadComponent();
      });
      this.habilidadesActual.slice(this.habilidadesActual.findIndex(x => x == habilidad), 1);
    }
  }

  abrirDialogo(): void {
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.disableClose = true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.data = (this.amodificar != undefined) ? {
      id_habilidad: this.amodificar.id_habilidad,
      nombre: this.amodificar.nombre,
      tipo: this.amodificar.tipo,
      porcentaje: this.amodificar.porcentaje
    } : {};
    const dialogo = this.dialog.open(EdithabilidadComponent, dialogoConfig);

    dialogo.afterClosed().subscribe(habilidad => {
      if (habilidad.id_habilidad == undefined) {
        this.habilidadesActual.push(habilidad);
        habilidad.id_habilidad = 0;
      }
      if (habilidad.id_habilidad != undefined) {
        this.bdService.setHabilidad(habilidad).subscribe();
      };
      this.reloadComponent();
    });
  }
}