import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutentificacionService } from '../autentificacion.service';
import { getAuth } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { PeticionesAjaxService } from '../peticiones-ajax.service';
@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {
  idUsuario:any;
  auth = getAuth();
  user = this.auth.currentUser;
  autenticado = false;
  constructor(public autentificacion:AutentificacionService, private ajax:PeticionesAjaxService){

  }
  ngOnInit(): void {
   
    this.usuarioActual()
  }
  iniciaSesionGoogle(){
    this.autentificacion.iniciarSesionGoogle();
    this.autenticado = true

  }
  iniciaSesionGitHub(){
    this.autentificacion.iniciarSesionGitHub();
    this.autenticado = true

  }
  cerrarSesion(){
    this.autentificacion.cerrarSesion();
    this.autenticado = false;

  }
  usuarioActual(){
        if (this.user) {
      this.autenticado = true
      this.idUsuario = this.user.uid;
      console.log(this.idUsuario)
    } else {
      console.log('no hay usuario logueado')
      this.autenticado=false;
    }}
}
