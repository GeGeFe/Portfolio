import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Formacion } from '../formacion';
import { TiposFormacion } from '../tiposformacion';

@Component({
  selector: 'app-editformacion',
  templateUrl: './editformacion.component.html',
  styleUrls: ['./editformacion.component.css']
})
export class EditformacionComponent implements OnInit {
  @Input() formacion!: Formacion;
  public losTipos:String[] = [];

  constructor(public dialogRef: MatDialogRef<EditformacionComponent>, @Inject(MAT_DIALOG_DATA) public data: Formacion) { 
    for (let tipo in TiposFormacion){
      if (isNaN(Number(tipo))){
      this.losTipos.push(tipo);
      }
    }
  }

  ngOnInit(): void { }

  cancelar() {
    this.dialogRef.close();
  }

}
