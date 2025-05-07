import { Injectable } from '@angular/core';// Importación de módulos y servicios necesarios de Angular y otras librerías
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SeguridadService } from '../servicios/seguridad.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
// Servicio de seguridad utilizado para gestionar la autenticación del usuario
  constructor(public miServicioSeguridad: SeguridadService, private router: Router) {}
// Método para interceptar las peticiones HTTP y manejar el token de autorización
intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
  // Verificar si hay una sesión activa y si la solicitud no es al endpoint de inicio de sesión
  if (this.miServicioSeguridad.usuarioSesionActiva && !this.esEndpointInicioSesion(request)) {
     // Agregar el token de autorización a la solicitud
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${this.miServicioSeguridad.usuarioSesionActiva.token}` }
    });
  }
 // Continuar con la solicitud y manejar errores de manera global
  return next.handle(request).pipe(
    catchError((err: HttpErrorResponse) => {
      // Redireccionar al usuario al dashboard si recibe un error de no autorizado
      if (err.status === 401 && !this.esEndpointInicioSesion(request)) {
        this.router.navigateByUrl('/pages/dashboard');
      }
      return throwError(err);
    })
  );
}

private esEndpointInicioSesion(request: HttpRequest<unknown>): boolean {
  // Verificar si la solicitud está destinada al endpoint de inicio de sesión
  //
  return request.url.includes('/login'); 
}

}
