import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editformacion',
  templateUrl: './editformacion.component.html',
  styleUrls: ['./editformacion.component.css']
})
export class EditformacionComponent implements OnInit {
  unaformacion: FormGroup;
  constructor(private FormBuilder: FormBuilder) {
    this.unaformacion = this.FormBuilder.group(
      {
        titulo: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*')]],
        fecha_inicio: [],
        fecha_final: [],
        logo: ['', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
        institucion: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*')]]
      }
    )
  }

  ngOnInit(): void {
  }

}
