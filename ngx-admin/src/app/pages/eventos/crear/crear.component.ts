import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Evento } from '../../../modelos/evento.model';
import { EventosService } from '../../../servicios/eventos.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  // Indica si el componente está en modo creación o edición
  modoCreacion: boolean = true;
  
  // Identificador del evento (en caso de edición)
  id: string = "";
  
  // Indica si se ha intentado enviar el formulario
  intentoEnvio: boolean = false;
  
  // Objeto que representa el evento
  elEvento: Evento = {
    ubicacion: "",
    fecha: "",
    tipoDeEvento: "",
    costoEntrada: ""
  }

  // Constructor del componente
  constructor(
    private miServicioEventos: EventosService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {}

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Verificar si se proporciona un ID en la ruta
    if (this.rutaActiva.snapshot.params.id) {
      this.modoCreacion = false;
      this.id = this.rutaActiva.snapshot.params.id;
      this.getEvento(this.id);
    } else {
      this.modoCreacion = true;
    }
  }

  // Obtener detalles del evento con el ID proporcionado
  getEvento(id: string): void {
    this.miServicioEventos.getEvento(id)
      .subscribe(data => {
        this.elEvento = data;
      });
  }

  // Método para agregar un nuevo evento
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioEventos.crear(this.elEvento)
        .subscribe(data => {
          Swal.fire(
            'Creado',
            'El evento ha sido creado correctamente',
            'success'
          );
          this.router.navigate(["pages/eventos/listar"]);
        });
    }
  }

  // Método para editar un evento existente
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioEventos.editar(this.elEvento._id, this.elEvento)
        .subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El evento ha sido actualizado correctamente',
            'success'
          );
          this.router.navigate(["pages/eventos/listar"]);
        });
    }
  }

  // Método para validar que los datos necesarios estén completos
  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (
      this.elEvento.ubicacion == "" ||
      this.elEvento.fecha == "" ||
      this.elEvento.tipoDeEvento == "" ||
      this.elEvento.costoEntrada == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}
