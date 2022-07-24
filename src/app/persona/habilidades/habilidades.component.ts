import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Habilidad } from "src/app/interfaces";
import { AutenticacionService } from "src/app/servicios/autenticacion.service";
import { BaseDeDatosService } from "src/app/servicios/base-de-datos.service";
import { EdithabilidadComponent } from "./edithabilidad/edithabilidad.component";
import { TiposHabilidad } from "./tiposhabilidad";

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  @Input() habilidadesActual!: Habilidad[];
  @Input() id_persona!: number;
  @Output() habilidadModificada = new EventEmitter<Habilidad[]>();


  habilidadesMostrar!: Habilidad[];
  public amodificar!: Habilidad;

  constructor(public autServicio: AutenticacionService, public bdService: BaseDeDatosService, private ruta: Router, public dialog: MatDialog) { }

  ngOnInit(): void { }

  reloadComponent(): void { this.habilidadModificada.emit(this.habilidadesActual); }

  ngOnChanges(): void {
    // Ordeno poniendo primero las habilidades hard.
    this.habilidadesMostrar = this.habilidadesActual.sort((hab1, hab2) => {
      if (hab1.tipo.toString()==TiposHabilidad[TiposHabilidad.Soft] && hab2.tipo.toString()==TiposHabilidad[TiposHabilidad.Hard]) { return 1; };
      if (hab1.tipo.toString()==TiposHabilidad[TiposHabilidad.Hard] && hab2.tipo.toString()==TiposHabilidad[TiposHabilidad.Soft]) { return -1; };
      return 0;
    })
  }

  btnModificar(evento: Event, habilidad: Habilidad): void {
    this.amodificar = habilidad;
    this.abrirDialogo()
  }

  btnEliminar(evento: Event, habilidad: Habilidad): void {
    if (confirm("¿Realmente quiere borrar esta habilidad?")) {
      this.habilidadesActual.slice(this.habilidadesActual.findIndex(x => x == habilidad), 1);
      this.bdService.delHabilidad(habilidad).subscribe(f => {
        this.reloadComponent();
      });
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
        // Habilidad nueva
        habilidad.id_habilidad = 0;
        this.habilidadesActual.push(habilidad);
      } else {
        // Habilidad existente
        this.habilidadesActual[this.habilidadesActual.findIndex(x => x == this.amodificar)] = habilidad;
      }
      if (habilidad.id_habilidad != undefined) {
        this.bdService.setHabilidad(habilidad, this.id_persona).subscribe(h => { this.reloadComponent(); });
      };
    });
  }
}