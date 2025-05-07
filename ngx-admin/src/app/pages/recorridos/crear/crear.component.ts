import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Recorrido } from '../../../modelos/recorrido.model';
import { RecorridosService } from '../../../servicios/recorridos.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true; // Variable para controlar si estamos en modo de creación o edición
  id: string = ""; // ID del recorrido en modo de edición
  intentoEnvio: boolean = false; // Bandera para controlar si se ha intentado enviar el formulario
  elRecorrido: Recorrido = { // Modelo de recorrido
    nombreRecorrido: "",
    duracionEstimada: "",
    precio: "",
    ubicacionInicio: "",
    ubicacionFinal: "",
    estaciones: "",
    podcast: ""
  }

  constructor(
    private miServicioRecorridos: RecorridosService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar si se proporciona un ID en la URL para determinar si estamos en modo de edición
    if (this.rutaActiva.snapshot.params.id) {
      this.modoCreacion = false;
      this.id = this.rutaActiva.snapshot.params.id;
      this.getRecorrido(this.id);
    } else {
      this.modoCreacion = true;
    }
  }

  getRecorrido(id: string): void {
    // Obtener los detalles del recorrido para la edición
    this.miServicioRecorridos.getRecorrido(id)
      .subscribe(data => {
        this.elRecorrido = data;
      });
  }

  agregar(): void {
    // Validar y agregar un nuevo recorrido
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioRecorridos.crear(this.elRecorrido)
        .subscribe(data => {
          Swal.fire(
            'Creado',
            'El recorrido ha sido creado correctamente',
            'success'
          )
          this.router.navigate(["pages/recorridos/listar"]);
        });
    }
  }

  editar(): void {
    // Validar y editar un recorrido existente
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioRecorridos.editar(this.elRecorrido._id, this.elRecorrido)
        .subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El recorrido ha sido actualizado correctamente',
            'success'
          );
          this.router.navigate(["pages/recorridos/listar"]);
        });
    }
  }

  validarDatosCompletos(): boolean {
    // Validar que todos los campos necesarios estén completos
    this.intentoEnvio = true;
    if (
      this.elRecorrido.nombreRecorrido == "" ||
      this.elRecorrido.duracionEstimada == "" ||
      this.elRecorrido.precio == "" ||
      this.elRecorrido.ubicacionInicio == "" ||
      this.elRecorrido.ubicacionFinal == "" ||
      this.elRecorrido.estaciones == "" ||
      this.elRecorrido.podcast == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}
