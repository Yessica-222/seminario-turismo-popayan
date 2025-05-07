// Importaciones necesarias
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Importa la configuración del entorno
import { Turista } from '../modelos/turista.model';  // Importa el modelo de Turista
import { Usuario } from '../modelos/usuario.model';  // Importa el modelo de Usuario

// Decorador Injectable para marcar la clase como un servicio inyectable
@Injectable({
  providedIn: 'root',
})
export class TuristasService {

  // Constructor que inyecta el servicio HttpClient para realizar solicitudes HTTP
  constructor(private http: HttpClient) { }

  // Método para listar turistas
  listar(): Observable<Turista[]> {
    return this.http.get<Turista[]>(`${environment.url_gateway}/turistas`);  
  }

  // Método para eliminar un turista por su ID
  eliminar(id:string){
    return this.http.delete<Turista>(`${environment.url_gateway}/turistas/${id}`);
  }

  // Método para obtener un turista por su ID
  getTurista(id: string): Observable<Turista> {
    return this.http.get<Turista>(`${environment.url_gateway}/turistas/${id}`);
  }

  // Método para crear un nuevo turista
  crear(elTurista: Turista){
    return this.http.post(`${environment.url_gateway}/turistas`, elTurista);
  }

  // Método para editar un turista existente por su ID
  editar(id:string, elTurista: Turista) {
    return this.http.put(`${environment.url_gateway}/turistas/${id}`, elTurista);
  }
}
