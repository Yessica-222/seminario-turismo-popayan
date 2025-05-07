// Importación de módulos y servicios necesarios de Angular y otras librerías
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Turista } from '../../../modelos/turista.model';
import { TuristasService } from '../../../servicios/turistas.service';
import { Router } from '@angular/router';

@Component({
  // Selector del componente
  selector: 'ngx-listar',
  // Plantilla HTML y estilos asociados al componente
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
// Definición de la clase ListarComponent que implementa OnInit
export class ListarComponent implements OnInit {
  // Arreglo para almacenar la lista de turistas
  turistas: Turista[];
  // Nombres de las columnas para la tabla
  nombresColumnas: string[] = ['Nombre','Apellido','Cedula','Idioma Nativo','Recorrido','Opciones'];

  // Constructor del componente, se utiliza para inyectar servicios necesarios
  constructor(private miServicioTuristas: TuristasService, private router: Router) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Inicialización de la lista de turistas
    this.listar();
  }

  // Método para obtener la lista de turistas desde el servicio
  listar(): void {
    this.miServicioTuristas.listar().
      subscribe(data => {
        this.turistas = data;
    });
  }

  // Método para navegar a la página de creación de un nuevo turista
  agregar(): void {
    console.log("Agregando nuevo");
    this.router.navigate(["pages/turistas/crear"]);
  }

  // Método para navegar a la página de edición de un turista
  editar(id: string): void {
    console.log("Editando a " + id);
    this.router.navigate(["pages/turistas/actualizar/" + id]);
  }

  // Método para eliminar un turista con confirmación usando SweetAlert2
  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Turista',
      text: "¿Está seguro que quiere eliminar el turista?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if(result.isConfirmed) {
        // Llamada al servicio para eliminar un turista
        this.miServicioTuristas.eliminar(id).
          subscribe(data => {
            // Mensaje de éxito utilizando SweetAlert2
            Swal.fire(
              'Eliminado!',
              'El turista ha sido eliminado correctamente',
              'success'
            )
            // Recargar la lista después de eliminar
            this.ngOnInit();
          });
      }
    })
  }
}
