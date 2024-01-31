import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AutentificacionService } from './autentificacion.service';

@Injectable({
  providedIn: 'root',
})
export class AutentificacionGuard implements CanActivate {
  constructor(private autentificacionService: AutentificacionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.autentificacionService.estaAutenticado()) {
      return true; // El usuario está autenticado, permitir el acceso
    } else {
      // El usuario no está autenticado, redirigir a la página de inicio de sesión
      return false;
    }
  }
}
