// Importar los módulos y servicios necesarios
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExperienciaTurista } from '../../../modelos/experiencia-turista.model';
import { ExperienciaTuristasService } from '../../../servicios/experiencia-turistas.service';
import { TuristasService } from '../../../servicios/turistas.service';
import { RecorridosService } from '../../../servicios/recorridos.service';

@Component({
  // Definir el selector del componente
  selector: 'ngx-crear',
  
  // Especificar la plantilla HTML y los estilos CSS del componente
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
  
  // Indicar los servicios que el componente va a utilizar
  providers: [TuristasService, RecorridosService],
})
export class CrearComponent {
  // Variables para controlar el modo de creación, el ID, y el estado de envío
  modoCreacion: boolean = true;
  id: string = "";
  intentoEnvio: boolean = false;
  
  // Objeto que representa la experiencia del turista con sus propiedades
  laExperienciaTurista: ExperienciaTurista = {
    fechaParticipacion: "",
    calificacion: "",
    comentario: ""
  }
  
  // Listas para almacenar turistas y recorridos
  listaDeTuristas: any[] = []; 
  listaDeRecorridos: any[] = []; 

  // Constructor del componente, inyectando los servicios necesarios
  constructor(
    private miExperienciaTuristas: ExperienciaTuristasService,
    private miTuristasService: TuristasService,
    private miRecorridosService: RecorridosService,
    private rutaActiva: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    // Obtener la lista de turistas
    this.miTuristasService.listar().subscribe((turista) => {
      this.listaDeTuristas = turista;
    });

    // Obtener la lista de recorridos
    this.miRecorridosService.listar().subscribe((recorrido) => {
      this.listaDeRecorridos = recorrido;
    });

    // Verificar si se proporciona un ID en la ruta
    if (this.rutaActiva.snapshot.params.id) {
      this.modoCreacion = false;
      this.id = this.rutaActiva.snapshot.params.id;
      this.getExperienciaTurista(this.id);
    } else {
      this.modoCreacion = true;
    }
  }

  // Obtener detalles de la experiencia del turista con el ID proporcionado
  getExperienciaTurista(id: string) {
    this.miExperienciaTuristas.getExperienciaTurista(id).
      subscribe(data => {
        this.laExperienciaTurista = data;
      });
  }

  // Método para agregar una nueva experiencia del turista
  agregar(): void {
    const idTuristaSeleccionado = this.laExperienciaTurista.id_Turista;
    const idRecorridoSeleccionado = this.laExperienciaTurista.id_Recorrido;
    if (this.validarDatosCompletos()) {
      console.log('Datos válidos');
  
      this.intentoEnvio = true;
  
      // Llamar al servicio para crear la experiencia del turista
      this.miExperienciaTuristas.crear(idTuristaSeleccionado, idRecorridoSeleccionado, this.laExperienciaTurista)
        .subscribe(
          data => {
            console.log('Respuesta del servidor:', data);
  
            // Mostrar mensaje de éxito y redirigir a la lista de experiencias del turista
            Swal.fire(
              'Creada',
              'La experiencia del turista ha sido creada correctamente',
              'success'
            );
            this.router.navigate(["pages/experiencia-turistas/listar"]);
          },
          error => {
            console.error('Error al crear:', error);
            // Puedes mostrar un mensaje de error al usuario si es necesario
          }
        );
    }
  }
  
  // Método para editar una experiencia del turista existente
  editar(): void {
    const idTuristaSeleccionado = this.laExperienciaTurista.id_Turista;
    const idRecorridoSeleccionado = this.laExperienciaTurista.id_Recorrido;
    this.intentoEnvio = true;
    this.laExperienciaTurista = { ...this.laExperienciaTurista };
    if (this.validarDatosCompletos()) {
      // Llamar al servicio para editar la experiencia del turista
      this.miExperienciaTuristas.editar(this.laExperienciaTurista._id, idTuristaSeleccionado, idRecorridoSeleccionado, this.laExperienciaTurista).
        subscribe(data => {
          // Mostrar mensaje de éxito y redirigir a la lista de experiencias del turista
          Swal.fire(
            'Actualizado',
            'La experiencia del turista ha sido actualizada correctamente',
            'success'
          );
          this.router.navigate(["pages/experiencia-turistas/listar"]);
        });
    }
  }

  // Método para validar que los datos necesarios estén completos
  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (
      this.laExperienciaTurista.fechaParticipacion == "" ||
      this.laExperienciaTurista.calificacion == "" ||
      this.laExperienciaTurista.comentario == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}
