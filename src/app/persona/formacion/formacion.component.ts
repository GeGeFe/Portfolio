import { Component, Input, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router } from '@angular/router';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';
import { Disciplina, Formacion } from '../../interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditformacionComponent } from './editformacion/editformacion.component';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {
  @Input() disciplinaActual!: Disciplina;
  @Input() formacionActual!: Formacion[];
  @Input() id_persona!: number;

  formacionMostrar!: Formacion[];
  public amodificar!: Formacion;

  constructor(public autServicio: AutenticacionService, public bdService: BaseDeDatosService, private ruta: Router, public dialog: MatDialog) { }

  ngOnInit(): void { }

  reloadComponent(): void {
    let currentUrl = this.ruta.url;
    this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ruta.onSameUrlNavigation = 'reload';
    this.ruta.navigate([currentUrl]);
  }

  ngOnChanges(): void { this.formacionMostrar = this.formacionActual.filter(f => { return (f.disciplina.id_disciplina == this.disciplinaActual.id_disciplina); }); }

  btnModificar(evento: Event, formacion: Formacion): void {
    this.amodificar = formacion;
    this.abrirDialogo()
  }

  btnEliminar(evento: Event, formacion: Formacion): void {
    if (confirm("¿Realmente quiere borrar esta formación?")) {
      this.bdService.delFormacion(formacion).subscribe(f => {
        this.reloadComponent();
      });
      this.formacionActual.slice(this.formacionActual.findIndex(x => x == formacion), 1);
    }
  }

  abrirDialogo(): void {
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.disableClose = true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.data = (this.amodificar != undefined) ? {
      id_educacion: this.amodificar.id_educacion,
      titulo: this.amodificar.titulo,
      tipo: this.amodificar.tipo,
      fecha_Inicio: this.amodificar.fecha_Inicio,
      fecha_Final: this.amodificar.fecha_Final,
      logo: this.amodificar.logo,
      institucion: this.amodificar.institucion,
      disciplina: this.amodificar.disciplina
    } : {};
    const dialogo = this.dialog.open(EditformacionComponent, dialogoConfig);

    dialogo.afterClosed().subscribe(formacion => {
      formacion.disciplina = this.disciplinaActual;
      if (formacion.id_educacion == undefined) {
        this.formacionActual.push(formacion);
        formacion.id_educacion = 0;
      }
      if (formacion.id_educacion != undefined) {
        this.bdService.setFormacion(formacion,this.id_persona).subscribe();
      };
      this.reloadComponent();
    });
  }
}
