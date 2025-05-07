// Importación de módulos y servicios necesarios de Angular y otras librerías
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Turista } from '../../../modelos/turista.model';
import { TuristasService } from '../../../servicios/turistas.service';

@Component({
  // Selector del componente
  selector: "ngx-crear",
  // Plantilla HTML y estilos asociados al componente
  templateUrl: "./crear.component.html",
  styleUrls: ["./crear.component.scss"],
})
// Definición de la clase CrearComponent que implementa OnInit
export class CrearComponent implements OnInit {
  // Propiedades para controlar el modo de creación, el ID, y el turista
  modoCreacion: boolean = true;
  id: string = "";
  intentoEnvio: boolean = false;
  elTurista: Turista = {
    nombre: "",
    apellido: "",
    cedula: "",
    idiomaNativo: "",
    recorrido: ""
  };

  // Constructor del componente, se utiliza para inyectar servicios necesarios
  constructor(
    private miServicioTuristas: TuristasService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Verificación de la existencia del parámetro ID en la URL
    if (this.rutaActiva.snapshot.params.id) {
      // El componente está en modo edición
      this.modoCreacion = false;
      this.id = this.rutaActiva.snapshot.params.id;
      this.getTurista(this.id);
    } else {
      // El componente está en modo creación
      this.modoCreacion = true;
    }
  }

  // Método para obtener los detalles de un turista existente
  getTurista(id: string): void {
    this.miServicioTuristas.getTurista(id).
      subscribe(data => {
        this.elTurista = data;
      });
  }

  // Método para agregar un nuevo turista
  agregar(): void {
    if (this.validarDatosCompletos()) {
      // Se activa el indicador de intento de envío
      this.intentoEnvio = true;
      // Llamada al servicio para crear un turista
      this.miServicioTuristas.crear(this.elTurista).
        subscribe(data => {
          // Mensaje de éxito utilizando SweetAlert2
          Swal.fire(
            'Creado',
            'El turista ha sido creado correctamente',
            'success'
          );
          // Redirección a la lista de turistas
          this.router.navigate(["pages/turistas/listar"]);
        });
    }
  }

  // Método para editar un turista existente
  editar(): void {
    // Se activa el indicador de intento de envío
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      // Llamada al servicio para editar un turista
      this.miServicioTuristas.editar(this.elTurista._id, this.elTurista).
        subscribe(data => {
          // Mensaje de éxito utilizando SweetAlert2
          Swal.fire(
            'Actualizado',
            'El turista ha sido actualizado correctamente',
            'success'
          );
          // Redirección a la lista de turistas
          this.router.navigate(["pages/turistas/listar"]);
        });
    }
  }

  // Método para validar que todos los campos requeridos estén completos
  validarDatosCompletos(): boolean {
    // Se activa el indicador de intento de envío
    this.intentoEnvio = true;
    // Verificación de campos vacíos
    if (
      this.elTurista.nombre == "" ||
      this.elTurista.apellido == "" ||
      this.elTurista.cedula == "" ||
      this.elTurista.idiomaNativo == "" ||
      this.elTurista.recorrido == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}
