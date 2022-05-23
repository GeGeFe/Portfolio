import { Component, Input, OnInit } from '@angular/core';
import { Disciplina, Proyecto } from 'src/app/interfaces';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  @Input() disciplinaActual!: Disciplina;
  @Input() proyectosActual!: Proyecto[];
  proyectosMostrar!: Proyecto[];
  public amodificar!: Proyecto;

  constructor() { 
  }

  ngOnChanges(): void {
    this.proyectosMostrar = this.proyectosActual.filter(p => { return (p.disciplina.id_disciplina == this.disciplinaActual.id_disciplina); });
  }

  ngOnInit(): void {
  }

}
