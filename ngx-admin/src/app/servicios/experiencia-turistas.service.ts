// Importaciones necesarias
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Importa la configuración del entorno
import { ExperienciaTurista } from '../modelos/experiencia-turista.model';  // Importa el modelo de ExperienciaTurista
import { Usuario } from '../modelos/usuario.model';  // Importa el modelo de Usuario

// Decorador Injectable para marcar la clase como un servicio inyectable
@Injectable({
  providedIn: "root",
})
export class ExperienciaTuristasService {
  // Constructor que inyecta el servicio HttpClient para realizar solicitudes HTTP
  constructor(private http: HttpClient) {}

  // Método para listar experiencias turistas
  listar(): Observable<ExperienciaTurista[]> {
    return this.http.get<ExperienciaTurista[]>(`${environment.url_gateway}/experienciaTuristas`);
  }

  // Método para eliminar una experiencia turista por su ID
  eliminar(id: string) {
    return this.http.delete<ExperienciaTurista>(`${environment.url_gateway}/experienciaTuristas/${id}`);
  }

  // Método para obtener una experiencia turista por su ID
  getExperienciaTurista(id: string): Observable<ExperienciaTurista> {
    return this.http.get<ExperienciaTurista>(`${environment.url_gateway}/experienciaTuristas/${id}`);
  }

  // Método para crear una nueva experiencia turista asociada a un turista y recorrido específicos
  crear(id_Turista, id_Recorrido, laExperienciaTurista: ExperienciaTurista) {
    return this.http.post(`${environment.url_gateway}/experienciaTuristas/turistas/${id_Turista}/recorridos/${id_Recorrido}`, laExperienciaTurista);
  }

  // Método para editar una experiencia turista existente asociada a un turista y recorrido específicos por sus respectivos IDs
  editar(id: string, id_turista:string, id_recorrido:string, laExperienciaTurista: ExperienciaTurista) {
    return this.http.put(`${environment.url_gateway}/experienciaTuristas/${id}/turistas/${id_turista}/recorridos/${id_recorrido}`, laExperienciaTurista);
  }
}
