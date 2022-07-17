import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Imagen } from 'src/app/interfaces';

@Component({
  selector: 'app-imagengrande',
  templateUrl: './imagengrande.component.html',
  styleUrls: ['./imagengrande.component.css']
})
export class ImagengrandeComponent implements OnInit {
  imagenengrande!: Imagen;

  constructor(public dialogRef: MatDialogRef<ImagengrandeComponent>, @Inject(MAT_DIALOG_DATA) public data: Imagen) {
    this.imagenengrande = data;
    console.log(JSON.stringify(this.imagenengrande));
  }

  ngOnInit(): void {
  }

}
