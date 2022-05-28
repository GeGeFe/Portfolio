import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Habilidad } from 'src/app/interfaces';
import { TiposHabilidad } from '../tiposhabilidad';

@Component({
  selector: 'app-edithabilidad',
  templateUrl: './edithabilidad.component.html',
  styleUrls: ['./edithabilidad.component.css']
})
export class EdithabilidadComponent implements OnInit {
  public losTipos: String[] = [];
  formulario: FormGroup;
  porcentaje!: number;

  constructor(public dialogRef: MatDialogRef<EdithabilidadComponent>, @Inject(MAT_DIALOG_DATA) public data: Habilidad) {
    for (let tipo in TiposHabilidad) {
      if (isNaN(Number(tipo))) {
        this.losTipos.push(tipo);
      }
    }

    this.formulario = new FormGroup({
      id_habilidad: new FormControl(data.id_habilidad, []),
      nombre: new FormControl(data.nombre, [Validators.required]),
      tipo: new FormControl(data.tipo, [Validators.required]),
      porcentaje: new FormControl(data.porcentaje, [Validators.required, Validators.min(0), Validators.max(100)])
    });
  }

  aceptar() { this.dialogRef.close(this.formulario.value); }

  ngOnInit(): void { }

  cancelar() { this.dialogRef.close(); }
}
