// Importación de módulos y clases necesarios de Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importación de componentes relacionados con turistas
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';

// Definición de las rutas para el módulo de turistas
const routes: Routes = [
  {
    // Ruta para listar turistas
    path: 'listar',
    component: ListarComponent
  },
  {
    // Ruta para crear un nuevo turista
    path: 'crear',
    component: CrearComponent
  },
  {
    // Ruta para actualizar/editar un turista existente, utiliza el mismo componente de creación
    path: 'actualizar/:id',
    component: CrearComponent
  }
];

// Decorador NgModule que define el módulo de enrutamiento de turistas
@NgModule({
  // Importación del módulo RouterModule con las rutas definidas
  imports: [RouterModule.forChild(routes)],
  // Exportación del módulo RouterModule para ser utilizado por otros módulos
  exports: [RouterModule]
})
export class TuristasRoutingModule { }
