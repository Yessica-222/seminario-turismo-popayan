// Importaciones necesarias
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Importa la configuración del entorno
import { Recorrido } from '../modelos/recorrido.model';  // Importa el modelo de Recorrido
import { Usuario } from '../modelos/usuario.model';  // Importa el modelo de Usuario

// Decorador Injectable para marcar la clase como un servicio inyectable
@Injectable({
  providedIn: 'root',
})
export class RecorridosService {
  
  // Constructor que inyecta el servicio HttpClient para realizar solicitudes HTTP
  constructor(private http: HttpClient) { }

  // Método para listar recorridos
  listar(): Observable<Recorrido[]> {
    return this.http.get<Recorrido[]>(`${environment.url_gateway}/recorridos`);  
  }

  // Método para eliminar un recorrido por su ID
  eliminar(id:string){
    return this.http.delete<Recorrido>(`${environment.url_gateway}/recorridos/${id}`);
  }

  // Método para obtener un recorrido por su ID
  getRecorrido(id: string): Observable<Recorrido> {
    return this.http.get<Recorrido>(`${environment.url_gateway}/recorridos/${id}`);
  }

  // Método para crear un nuevo recorrido
  crear(elRecorrido: Recorrido){
    return this.http.post(`${environment.url_gateway}/recorridos`, elRecorrido);
  }

  // Método para editar un recorrido existente por su ID
  editar(id:string, elRecorrido: Recorrido) {
    return this.http.put(`${environment.url_gateway}/recorridos/${id}`, elRecorrido);
  }
}
