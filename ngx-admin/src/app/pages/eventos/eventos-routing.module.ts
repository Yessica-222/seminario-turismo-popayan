import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';

// Definición de las rutas para el módulo de eventos
const routes: Routes = [
  {
    path: 'listar', // Ruta para listar eventos
    component: ListarComponent
  },
  {
    path: 'crear', // Ruta para crear un nuevo evento
    component: CrearComponent
  },
  {
    path: 'actualizar/:id', // Ruta para actualizar un evento existente 
    component: CrearComponent
  }
];

@NgModule({
  // Importación del módulo de rutas con las rutas definidas
  imports: [RouterModule.forChild(routes)],
  // Exportación del módulo de rutas para su uso en otros módulos
  exports: [RouterModule]
})
export class EventosRoutingModule { }
