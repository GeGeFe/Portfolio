import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  url = "http://192.168.0.7:8080/sesionInicio";
  currentUserSubject: BehaviorSubject<any>;
  public tokenactual!: String;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('UsuarioActual') || '{}'));
  }

  public IniciarSesion(credenciales: any): Observable<any> {
    return this.http.post(this.url, credenciales).pipe(map(datos => {
      this.tokenactual =JSON.parse(JSON.stringify(datos)).token;
      sessionStorage.setItem('token', JSON.parse(JSON.stringify(datos)).token);
      sessionStorage.setItem('username', JSON.parse(JSON.stringify(datos)).username);
      return datos;
    }
    ))
  }

  getToken() {
    return sessionStorage.getItem("token");
  }

  public logueado(): boolean {
    return sessionStorage.getItem("token") != "";
  }

  public logOut(): void {
    this.tokenactual = "";
    sessionStorage.setItem('token', "");
  }
}
