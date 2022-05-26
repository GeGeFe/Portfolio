import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Formacion } from 'src/app/interfaces';
import { TiposFormacion } from '../tiposformacion';

@Component({
  selector: 'app-editformacion',
  templateUrl: './editformacion.component.html',
  styleUrls: ['./editformacion.component.css']
})
export class EditformacionComponent implements OnInit {
  formulario: FormGroup;
  public losTipos: String[] = [];

  constructor(public dialogRef: MatDialogRef<EditformacionComponent>, @Inject(MAT_DIALOG_DATA) public data: Formacion) {
    for (let tipo in TiposFormacion) {
      if (isNaN(Number(tipo))) {
        this.losTipos.push(tipo);
      }
    }

    this.formulario = new FormGroup({
      id_educacion: new FormControl(data.id_educacion, []),
      institucion: new FormControl(data.institucion, [Validators.required]),
      logo: new FormControl(data.logo, [Validators.required]),
      tipo: new FormControl(data.tipo, [Validators.required]),
      titulo: new FormControl(data.titulo, [Validators.required]),
      fecha_Inicio: new FormControl(data.fecha_Inicio, [Validators.required]),
      fecha_Final: new FormControl(data.fecha_Final, [Validators.required])
    });
  }

  aceptar() { this.dialogRef.close(this.formulario.value); }

  ngOnInit(): void { }

  cancelar() { this.dialogRef.close(); }
}
