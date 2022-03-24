import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  url = "http://192.168.0.6:8080/sesionInicioIrrestricto";
  currentUserSubject: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('UsuarioActual') || '{}'));
    console.log("El servicio de autenticación está corriendo. ¡¡¡Alcancenlón!!!");
  }

  public IniciarSesion(credenciales: any): Observable<any> {
    return this.http.post(this.url+"?username="+ credenciales.username+"&password="+credenciales.password, credenciales).pipe(map(datos => {
      sessionStorage.setItem('UsuarioActual', JSON.stringify(datos));
      return datos;
    }
    ))
  }
}
