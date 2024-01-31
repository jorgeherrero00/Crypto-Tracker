import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"crypto-tracker-5ce6f","appId":"1:639020074858:web:76570c0f2bac1525cfc713","storageBucket":"crypto-tracker-5ce6f.appspot.com","apiKey":"AIzaSyBbWYQS03_vWSrQWMvJq1GxDiQyyoRbizQ","authDomain":"crypto-tracker-5ce6f.firebaseapp.com","messagingSenderId":"639020074858","measurementId":"G-MLY0H3J9MS"}))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ]
};