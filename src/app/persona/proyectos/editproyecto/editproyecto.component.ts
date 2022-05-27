import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proyecto } from 'src/app/interfaces';

@Component({
  selector: 'app-editproyecto',
  templateUrl: './editproyecto.component.html',
  styleUrls: ['./editproyecto.component.css']
})
export class EditproyectoComponent implements OnInit {
  formulario: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditproyectoComponent>, @Inject(MAT_DIALOG_DATA) public data: Proyecto) {
    this.formulario = new FormGroup({
      id_proyecto: new FormControl(data.id_proyecto, []),
      nombre: new FormControl(data.nombre, [Validators.required]),
      descripcion: new FormControl(data.descripcion, [Validators.required]),
      enlace: new FormControl(data.enlace, [Validators.required]),
      fecha_Publicacion: new FormControl(data.fecha_Publicacion, [Validators.required])
    });
  }

  aceptar() { this.dialogRef.close(this.formulario.value); }

  ngOnInit(): void { }

  cancelar() { this.dialogRef.close(); }}
