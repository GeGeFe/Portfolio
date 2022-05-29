import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from 'src/app/interfaces';

@Component({
  selector: 'app-editpersona',
  templateUrl: './editpersona.component.html',
  styleUrls: ['./editpersona.component.css']
})
export class EditpersonaComponent implements OnInit {
  formulario: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditpersonaComponent>, @Inject(MAT_DIALOG_DATA) public data: Persona) {
    console.log(JSON.stringify(data));
    this.formulario = new FormGroup({
      id_persona: new FormControl(data.id_persona, []),
      nombre: new FormControl(data.nombre, [Validators.required]),
      apellido: new FormControl(data.apellido, [Validators.required]),
      banner: new FormControl(data.banner, [Validators.required]),
      avatar: new FormControl(data.avatar, [Validators.required]),
      fecha_Nacimiento: new FormControl(data.fecha_Nacimiento, [Validators.required]),
      acerca_de: new FormControl(data.acerca_de, [Validators.required])
    })
  }

  aceptar() { this.dialogRef.close(this.formulario.value); }

  ngOnInit(): void { }

  cancelar(): void { this.dialogRef.close(); }
}