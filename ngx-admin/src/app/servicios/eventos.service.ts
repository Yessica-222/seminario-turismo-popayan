// Importaciones necesarias
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Importa la configuración del entorno
import { Evento } from '../modelos/evento.model';  // Importa el modelo de Evento
import { Usuario } from '../modelos/usuario.model';  // Importa el modelo de Usuario

// Decorador Injectable para marcar la clase como un servicio inyectable
@Injectable({
  providedIn: "root",
})
export class EventosService {
  // Constructor que inyecta el servicio HttpClient para realizar solicitudes HTTP
  constructor(private http: HttpClient) {}

  // Método para listar eventos
  listar(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${environment.url_gateway}/eventos`);
  }

  // Método para eliminar un evento por su ID
  eliminar(id: string) {
    return this.http.delete<Evento>(`${environment.url_gateway}/eventos/${id}`);
  }

  // Método para obtener un evento por su ID
  getEvento(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${environment.url_gateway}/eventos/${id}`);
  }

  // Método para crear un nuevo evento
  crear(elEvento: Evento) {
    return this.http.post(`${environment.url_gateway}/eventos`, elEvento);
  }

  // Método para editar un evento existente por su ID
  editar(id: string, elEvento: Evento) {
    return this.http.put(`${environment.url_gateway}/eventos/${id}`, elEvento);
  }
}
