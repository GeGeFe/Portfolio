import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new FormControl('', [Validators.required, Validators.min(8), Validators.pattern("[a-zA-Z0-9]*")]);
  clave = new FormControl('', [Validators.required, Validators.min(8)]);

  getErrorMessageUsuario() {
    if (this.usuario.hasError('required')) {
      return '¡Debe ingresar un usuario!';
    }
    return this.usuario.hasError('pattern') ? 'El usuario debe contener solo letras o números.' : '';
  }
  getErrorMessageClave() {
    if (this.clave.hasError('required')) {
      return '¡Debe ingresar la contraseña!';
    }
    return this.clave.hasError('min') ? 'La contraseña debe tener un mínimo de 8.' : '';
  }
  //  constructor() { }

  ngOnInit(): void {
  }

}
