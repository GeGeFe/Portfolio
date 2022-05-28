import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Imagen } from 'src/app/interfaces';

@Component({
  selector: 'app-editimagen',
  templateUrl: './editimagen.component.html',
  styleUrls: ['./editimagen.component.css']
})
export class EditimagenComponent implements OnInit {
  formulario: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditimagenComponent>, @Inject(MAT_DIALOG_DATA) public data: Imagen) {
    this.formulario = new FormGroup({
      id_imagen: new FormControl(data.id_imagen, []),
      posicion: new FormControl(data.posicion),
      titulo: new FormControl(data.titulo, [Validators.required]),
      enlace: new FormControl(data.enlace, [Validators.required])
    });
  }

  aceptar() { this.dialogRef.close(this.formulario.value); }

  ngOnInit(): void { }

  cancelar() { this.dialogRef.close(); }
}
