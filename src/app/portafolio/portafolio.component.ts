import { Component } from '@angular/core';
import { PeticionesAjaxService } from '../peticiones-ajax.service';
import { getAuth } from 'firebase/auth';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.css'
})
export class PortafolioComponent {
  idUsuario: any;
  auth = getAuth();
  user = this.auth.currentUser;

  constructor(public ajax: PeticionesAjaxService) {}

  ngOnInit(): void {
    this.usuarioActual();
  }

  usuarioActual() {
    if (this.user) {
      this.idUsuario = this.user.uid;
      console.log(this.user.uid);
      this.ajax.obtenerDatosUsuario(this.idUsuario);
    } else {
      console.log('no hay usuario logueado');
    }
  }
}
