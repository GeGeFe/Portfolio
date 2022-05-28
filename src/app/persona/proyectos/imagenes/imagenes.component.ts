import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Imagen, Proyecto } from 'src/app/interfaces';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';
import { EditimagenComponent } from './editimagen/editimagen.component';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent implements OnInit {
  @Input() imagenes!: Imagen[];
  @Input() proyecto!: Proyecto;
  amodificar!: Imagen;

  constructor(public autServicio: AutenticacionService, public bdService: BaseDeDatosService, private ruta: Router, public dialog: MatDialog) { }

  ngOnInit(): void { }

  reloadComponent(): void {
    let currentUrl = this.ruta.url;
    this.ruta.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ruta.onSameUrlNavigation = 'reload';
    this.ruta.navigate([currentUrl]);
  }

  ngOnChanges(): void {
    this.imagenes = this.imagenes.sort((img1, img2) => {
      if (img1.posicion > img2.posicion) { return 1; }
      if (img1.posicion < img2.posicion) { return -1; }
      return 0;
    }
    )
  }

  btnModificar(evento: Event, imagen: Imagen): void {
    this.amodificar = imagen;
    this.abrirDialogo()
  }

  btnEliminar(evento: Event, imagen: Imagen): void {
    if (confirm("¿Realmente quiere borrar esta imagen?")) {
      this.bdService.delImagen(imagen).subscribe(p => {
        this.reloadComponent();
      });
      this.imagenes.slice(this.imagenes.findIndex(x => x == imagen), 1);
    }
  }

  abrirDialogo(): void {
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.disableClose = true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.data = (this.amodificar != undefined) ? {
      id_imagen: this.amodificar.id_imagen,
      titulo: this.amodificar.titulo,
      posicion: this.amodificar.posicion,
      enlace: this.amodificar.enlace,
    } : {};
    const dialogo = this.dialog.open(EditimagenComponent, dialogoConfig);

    dialogo.afterClosed().subscribe(imagen => {
      if (imagen.id_imagen == undefined) {
        imagen.posicion = this.imagenes.length + 1;
        this.imagenes.push(imagen);
        imagen.id_imagen = 0;
      }
      if (imagen.id_imagen != undefined) {
        this.bdService.setImagen(imagen, this.proyecto.id_proyecto).subscribe();
      };
      this.reloadComponent();
    });
  }
}
