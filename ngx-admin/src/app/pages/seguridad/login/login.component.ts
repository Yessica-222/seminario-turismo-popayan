// Importación de módulos y servicios necesarios de Angular y otras librerías
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../modelos/usuario.model';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  // Selector del componente
  selector: 'ngx-login',
  // Plantilla HTML y estilos asociados al componente
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
// Definición de la clase LoginComponent que implementa OnInit
export class LoginComponent implements OnInit {
  // Propiedades para almacenar el correo, contraseña y mensaje de error
  correo: string = "";
  contrasena: string = "";
  errorMensaje: string = "";

  // Constructor del componente, se utiliza para inyectar servicios necesarios
  constructor(private miServicioSeguridad: SeguridadService, private router: Router) { }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {}

  // Método que realiza la acción de inicio de sesión
  login(): void {
    // Creación de un objeto Usuario con las credenciales ingresadas
    let elUsuario: Usuario = {
      correo: this.correo,
      contrasena: this.contrasena
    }

    // Llamada al servicio de seguridad para realizar el inicio de sesión
    this.miServicioSeguridad.login(elUsuario).subscribe(
      // Callback para manejar la respuesta exitosa del servidor
      data => {
        // Verificación de la existencia del token en la respuesta
        if (data && data.token) {
          // Almacenamiento de datos de sesión y redirección
          this.miServicioSeguridad.guardarDatosSesion(data);
          this.miServicioSeguridad.verificarSesionYRedirigir();
          this.router.navigate(['pages/dashboard']);
          // Mostrar mensaje de éxito utilizando SweetAlert2
          Swal.fire({
            title: 'Inicio de Sesión Exitoso',
            text: '¡Bienvenido! Has iniciado sesión correctamente.',
            icon: 'success',
            timer: 15000
          });
        } else {
          console.error('El servidor no devolvió un token válido.');
        }
      },
      // Callback para manejar errores en la respuesta del servidor
      error => {
        // Verificación del código de estado 401 (no autorizado)
        if (error.status === 401) {
          // Mostrar mensaje de error de credenciales incorrectas
          Swal.fire({
            title: 'Error Login',
            text: 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.',
            icon: 'error',
            timer: 10000
          });
        } else {
          // Mostrar mensaje de error genérico
          Swal.fire({
            title: 'Error Login',
            text: 'Ha ocurrido un error inesperado. Por favor, inténtalo nuevamente.',
            icon: 'error',
            timer: 10000
          });
        }
      }
    );
  }
}
