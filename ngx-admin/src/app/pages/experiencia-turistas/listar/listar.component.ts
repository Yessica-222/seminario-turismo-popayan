// Importar módulos y servicios necesarios
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'; 
import { ExperienciaTurista } from '../../../modelos/experiencia-turista.model';
import { ExperienciaTuristasService } from '../../../servicios/experiencia-turistas.service';
import { Router } from '@angular/router';

@Component({
  // Definir el selector del componente
  selector: 'ngx-listar',
  
  // Especificar la plantilla HTML y los estilos CSS del componente
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  // Variable para almacenar la lista de experiencias de turistas
  experienciaTuristas: ExperienciaTurista[];
  
  // Nombres de las columnas en la tabla
  nombresColumnas: string[] = ['Fecha Participacion','Calificacion','Comentario','Opciones'];

  // Constructor del componente, inyectando los servicios necesarios y el enrutador
  constructor(private miServicioExperienciaTuristas: ExperienciaTuristasService, private router: Router) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.listar();
  }

  // Método para obtener y mostrar la lista de experiencias de turistas
  listar(): void {
    this.miServicioExperienciaTuristas.listar().
      subscribe(data => {
        this.experienciaTuristas = data;
    });
  }

  // Método para navegar a la página de creación de una nueva experiencia de turista
  agregar(): void {
    console.log("Agregando nuevo")
    this.router.navigate(["pages/experiencia-turistas/crear"]);
  }

  // Método para navegar a la página de edición de una experiencia de turista específica
  editar(id: string): void {
    console.log("Editando a " + id)
    this.router.navigate(["pages/experiencia-turistas/actualizar/" + id]);
  }

  // Método para eliminar una experiencia de turista con confirmación del usuario
  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Experiencia Turistas',
      text: "¿Está seguro que quiere eliminar la experiencia turista?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioExperienciaTuristas.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'La experiencia turista ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }
}
