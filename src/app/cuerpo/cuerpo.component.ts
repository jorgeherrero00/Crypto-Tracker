import { Component,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeticionesAjaxService } from '../peticiones-ajax.service';
import { Router, RouterModule } from '@angular/router';
import { collection, addDoc } from "firebase/firestore"; 
import { inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
@Component({
  selector: 'app-cuerpo',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.css'
})
export class CuerpoComponent {
  items:any[] = [];
  contenidoInput = '';
  idUsuario:any;
  firestore = inject(Firestore);
  @Output() lanzadaPeticionEvent = new EventEmitter<string>();
  id_coin=""
  auth = getAuth();
  user = this.auth.currentUser;



  borrarValor(pos:any){
    this.items.splice(pos,1)
  }

  constructor(public ajax: PeticionesAjaxService, private router: Router) {
  }
  
  mostrarDetalle(id:any){
    console.log('Navegando al detalle del '+id);
    this.router.navigate(["detalle/"+id])
  }

  ngOnInit(): void {
    this.ajax.peticionAJAX();
    this.ajax.obtenerDatosFirestore();
    this.usuarioActual()
  }


timeoutId:any;
busquedaMoneda(moneda:string) {
  // Limpiar la espera anterior si existe
  clearTimeout(this.timeoutId);

  // Establecer una nueva espera de 5 segundos
  this.timeoutId = setTimeout(() => {
    // Realizar la búsqueda después de 5 segundos
    this.ajax.peticionAjaxMoneda(moneda);
  }, 1000);
}

usuarioActual(){
  console.log(getAuth());
  if (this.user) {
    
    this.idUsuario = this.user.uid;
    console.log(this.user.uid)
  } else {
    console.log('no hay usuario logueado')
  }}

  monedaEstaEnPortafolio(idMoneda: string): boolean {
    return this.ajax.datosPortafolio.some((item) => item.idMoneda === idMoneda);
  }
}
