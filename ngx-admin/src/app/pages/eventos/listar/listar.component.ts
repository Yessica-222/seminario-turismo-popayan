import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Evento } from '../../../modelos/evento.model';
import { EventosService } from '../../../servicios/eventos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  // Arreglo que contiene los eventos
  eventos: Evento[];
  
  // Nombres de las columnas a mostrar en la tabla
  nombresColumnas: string[] = ['Ubicacion', 'Fecha', 'Tipo de Evento', 'Costo Entrada', 'Opciones'];

  // Constructor del componente
  constructor(private miServicioEventos: EventosService, private router: Router) {}

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Llamar al método para listar eventos
    this.listar();
  }

  // Método para listar eventos
  listar(): void {
    this.miServicioEventos.listar()
      .subscribe(data => {
        // Asignar el resultado al arreglo de eventos
        this.eventos = data;
      });
  }

  // Método para navegar a la página de creación de eventos
  agregar(): void {
    console.log("Agregando nuevo");
    this.router.navigate(["pages/eventos/crear"]);
  }

  // Método para navegar a la página de edición de eventos
  editar(id: string): void {
    console.log("Editando a " + id);
    this.router.navigate(["pages/eventos/actualizar/" + id]);
  }

  // Método para eliminar un evento
  eliminar(id: string): void {
    // Mostrar un mensaje de confirmación antes de eliminar
    Swal.fire({
      title: 'Eliminar Evento',
      text: "¿Está seguro que quiere eliminar el evento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar al servicio para eliminar el evento
        this.miServicioEventos.eliminar(id)
          .subscribe(data => {
            // Mostrar mensaje de éxito y volver a listar eventos
            Swal.fire(
              'Eliminado!',
              'El evento ha sido eliminado correctamente',
              'success'
            );
            this.ngOnInit(); // Volver a cargar la lista de eventos
          });
      }
    });
  }
}
