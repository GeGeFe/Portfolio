import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  public personaActual:String="Gabriel Gioiosa Farina"; // Inicialmente se va a cargar el perfil mio. Luego habra que implementar funciones para poder cambiar este usuario.
  public urlBanner:String="";
  public urlFoto:String="";
  public acercaDe:String="Esto es una descripción sintética del curriculum.";

  constructor() { }

  ngOnInit(): void {
  }

}
