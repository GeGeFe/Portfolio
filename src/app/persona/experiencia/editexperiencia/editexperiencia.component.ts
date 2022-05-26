import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/interfaces';

@Component({
  selector: 'app-editexperiencia',
  templateUrl: './editexperiencia.component.html',
  styleUrls: ['./editexperiencia.component.css']
})
export class EditexperienciaComponent implements OnInit {
  formulario: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditexperienciaComponent>, @Inject(MAT_DIALOG_DATA) public data: Experiencia) {
    this.formulario = new FormGroup({
      id_experiencia: new FormControl(data.id_experiencia, []),
      puesto: new FormControl(data.puesto, [Validators.required]),
      descripcion_Tareas: new FormControl(data.descripcion_Tareas, [Validators.required]),
      logo_Empresa: new FormControl(data.logo_Empresa, [Validators.required]),
      nombre_Empresa: new FormControl(data.nombre_Empresa, [Validators.required]),
      fecha_Inicio: new FormControl(data.fecha_Inicio, [Validators.required]),
      fecha_Final: new FormControl(data.fecha_Final, [Validators.required])
    })
  }

  aceptar() { this.dialogRef.close(this.formulario.value); }

  ngOnInit(): void { }

  cancelar(): void { this.dialogRef.close(); }
}