// Importar el módulo necesario de Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes relacionados con las experiencias de turistas
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';

// Definir las rutas asociadas a cada componente
const routes: Routes = [
  {
    path: 'listar',
    component: ListarComponent
  },
  {
    path: 'crear',
    component: CrearComponent
  },
  {
    path: 'actualizar/:id',
    component: CrearComponent
  }
];

@NgModule({
  // Importar las rutas definidas
  imports: [RouterModule.forChild(routes)],
  
  // Exportar el módulo de rutas para su uso en otros módulos
  exports: [RouterModule]
})
export class ExperienciaTuristasRoutingModule { }
