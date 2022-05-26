import { Component, OnInit } from "@angular/core";
import { Habilidad } from "src/app/interfaces";

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  habilidadesMostrar!: Habilidad[];
  constructor() { }

  ngOnInit(): void {
  }

}