import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Experiencia } from 'src/app/interfaces';

@Component({
  selector: 'app-editexperiencia',
  templateUrl: './editexperiencia.component.html',
  styleUrls: ['./editexperiencia.component.css']
})
export class EditexperienciaComponent implements OnInit {
  @Input() experiencia!:Experiencia;

  constructor(public dialogRef: MatDialogRef<EditexperienciaComponent>, @Inject(MAT_DIALOG_DATA) public data: Experiencia) { }

  ngOnInit(): void { }

  cancelar() {
    this.dialogRef.close();
  }

}
