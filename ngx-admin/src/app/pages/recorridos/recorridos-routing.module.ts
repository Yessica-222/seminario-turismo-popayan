import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';

const routes: Routes = [
  {
    path: 'listar',
    component: ListarComponent  // Ruta para listar recorridos, asociada al componente ListarComponent
  },
  {
    path: 'crear',
    component: CrearComponent  // Ruta para crear recorridos, asociada al componente CrearComponent
  },
  {
    path: 'actualizar/:id',
    component: CrearComponent  // Ruta para actualizar recorridos con un ID específico, asociada al componente CrearComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecorridosRoutingModule { }
