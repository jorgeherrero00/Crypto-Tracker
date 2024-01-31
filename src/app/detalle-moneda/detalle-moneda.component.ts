import { Component, Input, OnInit } from '@angular/core';
import { PeticionesAjaxService } from '../peticiones-ajax.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-moneda.component.html',
  styleUrl: './detalle-moneda.component.css'
})
export class DetalleComponent implements OnInit{
  @Input() id:string = '';

  constructor(public ajax:PeticionesAjaxService){

  }

  ngOnInit(): void {
      this.ajax.peticionAJAXDetalle(this.id)
  }

}

