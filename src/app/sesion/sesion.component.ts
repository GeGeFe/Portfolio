import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {
  formulario: FormGroup;
  constructor(private FormBuilder: FormBuilder, public ServicioAutenticacion: AutenticacionService, private ruta: Router) {
    this.formulario = this.FormBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*')]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*')]],
        deviceInfo: this.FormBuilder.group({
          deviceId: ["17867868768"],
          deviceType: ["DEVICE_TYPE_ANDROID"],
          notificationToken: ["67657575eececc34"]
        })
      }
    )
  }

  ngOnInit(): void {
    if (this.ServicioAutenticacion.logueado()){
      this.ServicioAutenticacion.logOut();
      this.ruta.navigate(['/']);
    }
  }

  getUsuario() {
    return this.formulario.get("username")
  }
  getPassword() {
    return this.formulario.get("password")
  }

  alEnviar(evento: Event) {
    evento.preventDefault;
    this.ServicioAutenticacion.IniciarSesion(this.formulario.value).subscribe(datos => {
      console.log("DATA " + JSON.stringify(datos));
      this.ruta.navigate(['/']);
    })
  }
}
