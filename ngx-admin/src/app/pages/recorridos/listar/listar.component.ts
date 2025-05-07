import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Recorrido } from '../../../modelos/recorrido.model';
import { RecorridosService } from '../../../servicios/recorridos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  recorridos: Recorrido[]; // Lista de recorridos
  nombresColumnas: string[] = ['Nombre Recorrido', 'Duracion Estimada', 'Precio', 'Ubicacion Inicio', 'Ubicacion Final', 'Estaciones', 'Podcast', 'Opciones'];

  constructor(private miServicioRecorridos: RecorridosService, private router: Router) {}

  ngOnInit(): void {
    this.listar(); // Llama al método para cargar la lista de recorridos al inicializar el componente
  }

  listar(): void {
    this.miServicioRecorridos.listar().
      subscribe(data => {
        this.recorridos = data; // Asigna los recorridos obtenidos del servicio a la propiedad del componente
    });
  }

  agregar(): void {
    console.log("Agregando nuevo");
    this.router.navigate(["pages/recorridos/crear"]); // Redirige a la página de creación de recorridos
  }

  editar(id: string): void {
    console.log("Editando a " + id);
    this.router.navigate(["pages/recorridos/actualizar/" + id]); // Redirige a la página de edición de recorridos con el ID específico
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Recorrido',
      text: "Está seguro que quiere eliminar el recorrido?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioRecorridos.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El recorrido ha sido eliminado correctamente',
              'success'
            );
            this.ngOnInit(); // Recarga la lista de recorridos después de eliminar uno
          });
      }
    })
  }
}
