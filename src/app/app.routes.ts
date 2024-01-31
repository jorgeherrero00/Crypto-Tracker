import { Routes } from '@angular/router';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { DetalleComponent } from './detalle-moneda/detalle-moneda.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { AutentificacionGuard } from './autentificacion.guard';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { LandingComponent } from './landing/landing.component';
export const routes: Routes = [
    {path: '', component:LandingComponent},
    {path: 'cuerpo', component:CuerpoComponent, canActivate:[AutentificacionGuard]},
    {path: 'detalle/:id', component:DetalleComponent, canActivate:[AutentificacionGuard]},
    {path: 'portafolio', component:PortafolioComponent, canActivate:[AutentificacionGuard]},

];
