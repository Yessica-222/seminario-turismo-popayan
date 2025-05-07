import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienciaTuristasRoutingModule } from './experiencia-turistas-routing.module';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';
import { NbCardModule } from '@nebular/theme';  // Módulo de tarjetas Nebular para estilos y funcionalidades
import { FormsModule } from '@angular/forms';   // Módulo para soporte de formularios en Angular

@NgModule({
  declarations: [
    CrearComponent,   // Declaración del componente Crear
    ListarComponent   // Declaración del componente Listar
  ],
  imports: [
    CommonModule,                      // Módulo común de Angular con directivas básicas
    ExperienciaTuristasRoutingModule,  // Módulo de rutas específico para experiencias de turistas
    NbCardModule,                      // Módulo de tarjetas Nebular para estilos y funcionalidades
    FormsModule                        // Módulo para soporte de formularios en Angular
  ],
  exports: [] 
})
export class ExperienciaTuristasModule { }
