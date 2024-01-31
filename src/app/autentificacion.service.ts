import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signOut, GithubAuthProvider   } from 'firebase/auth';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {  
  private auth = getAuth();
  private autenticado = false;

  constructor() { 
    onAuthStateChanged(this.auth, (user) => {
      this.autenticado = !!user; // El doble signo de exclamación convierte el valor en un booleano
    });
  }

  estaAutenticado(): boolean {
    return this.autenticado;
  }

  iniciarSesionGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider(); // Create an instance of GoogleAuthProvider
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token;//credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        console.log('sesion iniciada')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  iniciarSesionGitHub(){
    const auth = getAuth();
    const provider = new GithubAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
       // const token = credential.accessToken;
    
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log('sesion iniciada')

      }) .catch((error) => {
        console.error('Error al iniciar sesión con GitHub:', error);
        console.log('sesion no iniciada');
      });
  }
  iniciarSesionCorreoContrasena(correo: string, contrasena: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, correo, contrasena)
      .then((userCredential) => {
        // Proceso de inicio de sesión con correo y contraseña
        console.log('sesion iniciada con correo y contraseña');
      })
      .catch((error) => {
        // Manejar errores
        console.error('Error al iniciar sesión con correo y contraseña:', error);
      });
  }

  registrarUsuarioCorreoContrasena(correo='jorge@gmail.com', contrasena='jorgemadrid5') {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, correo, contrasena)
      .then((userCredential) => {
        // Proceso de registro de usuario con correo y contraseña
        console.log('Usuario registrado con correo y contraseña');
      })
      .catch((error) => {
        // Manejar errores
        console.error('Error al registrar usuario con correo y contraseña:', error.code, error.message);
      });
  }
  

  cerrarSesion() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Sesión cerrada correctamente');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}
