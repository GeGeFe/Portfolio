import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public idPersona: number = 1;

  constructor(private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    this.idPersona = this.ruta.snapshot.params['idPersona'];
    if (this.idPersona==null) {this.idPersona=1};
  }

}
