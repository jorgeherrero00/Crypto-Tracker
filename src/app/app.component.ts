import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { FooterComponent } from '../footer/footer.component';
import { OnInit } from '@angular/core';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { LandingComponent } from './landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,CabeceraComponent,CuerpoComponent,FooterComponent,LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'crypto-tracker';
  firestore = inject(Firestore);

  ngOnInit() {
    getDocs(collection(this.firestore, "monedas")).then((response) => {
      console.log(response.docs)
    })
  }
}