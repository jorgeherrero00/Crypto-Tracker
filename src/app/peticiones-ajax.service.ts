import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getFirestore, getDocs, collection, onSnapshot, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Firestore } from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';
import {  query, where } from "firebase/firestore";
import { and } from 'firebase/firestore/lite';

@Injectable({
  providedIn: 'root'
})
export class PeticionesAjaxService {

  constructor(private http:HttpClient) { 
    
  }
  datosFS :any[] = [];
  datosApi:any[] = [];
  datosPortafolio:any[] = [];
  detallesPortafolio:any[] = [];
  datosDetalle:any = undefined;
  datosMoneda:any[] = [];
  firestore = inject(Firestore);
 public peticionAJAX(){
    this.http.get("https://api.coingecko.com/api/v3/search/trending").subscribe((datos:any)=>{
      console.log(datos)
      //this.items = datos;
      this.datosApi = datos.coins;
    });
  }
 public peticionAJAXDetalle(id:any){
    this.http.get("https://api.coingecko.com/api/v3/coins/"+id).subscribe((datos:any)=>{
      console.log(datos)
      //this.items = datos;
      this.datosDetalle = datos;
    });
  }

  public peticionAjaxMoneda(moneda:string){
    this.http.get("https://api.coingecko.com/api/v3/search?query="+moneda).subscribe((datos:any)=>{
      console.log(datos.coins)
      //this.items = datos;
      this.datosMoneda = datos.coins;
    });
  }

  obtenerDatosFirestore(){
    getDocs(collection(this.firestore, "monedas")).then((response)=>{
      this.datosFS = response.docs.map(doc => doc.data())
      console.log(this.datosFS);
    });
  }

  async obtenerDatosUsuario(idUsuario: any) {
    const db = getFirestore(); // Inicializa Firestore
    const q = query(collection(db, "monedas"), where("idUsuario", "==", idUsuario));
    const querySnapshot = await getDocs(q);
  
    this.datosPortafolio = []; // Inicializa como un array vacío antes de usarlo
    this.detallesPortafolio = []; // Inicializa como un array vacío antes de usarlo
  
    querySnapshot.forEach((doc) => {
      // Agrega cada documento al array
      this.datosPortafolio.push(doc.data());
    });
  
    for (let i = 0; i < this.datosPortafolio.length; i++) {
      this.http.get("https://api.coingecko.com/api/v3/coins/" + this.datosPortafolio[i].idMoneda)
        .subscribe((datos: any) => {
          console.log(datos);
          this.detallesPortafolio.push(datos); // Agrega cada detalle al array
        });
    }
  }


  async seguirCrypto(idUsuario: any, idMoneda: any) {
    const db = getFirestore();
    const q = query(collection(db, "monedas"), where("idUsuario", "==", idUsuario) && where("idMoneda", "==", idMoneda));
  
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      // Si el usuario no ha seguido esta moneda, entonces puedes agregarla
      const docRef = await addDoc(collection(this.firestore, "monedas"), {
        idUsuario: idUsuario,
        idMoneda: idMoneda
      });
  
      console.log("Document written with ID: " + docRef.id);
    } else {
      // Si el usuario ya sigue esta moneda, puedes manejarlo según tus necesidades.
      console.log("El usuario ya sigue esta moneda.");
      // Puedes lanzar una alerta, mostrar un mensaje, etc.
    }
  
    // Actualizar datos del usuario después de la operación
    this.obtenerDatosUsuario(idUsuario);
  }
  
  dejarDeSeguir(idUsuario: any, idMoneda: any) {
    console.log(idMoneda, idUsuario);
    const db = getFirestore();
    const q = query(collection(db, "monedas"), where("idUsuario", "==", idUsuario) && where("idMoneda", "==", idMoneda));
  
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref)
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      });
    });
    this.obtenerDatosUsuario(idUsuario);
  }
  
}
