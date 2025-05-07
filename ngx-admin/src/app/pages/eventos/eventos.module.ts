import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importación del módulo de rutas específicas para eventos
import { EventosRoutingModule } from './eventos-routing.module';

// Importación de componentes del módulo de eventos
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';

// Importación de módulos de Nebular y FormsModule
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  // Declaración de componentes que pertenecen al módulo de eventos
  declarations: [
    CrearComponent,
    ListarComponent
  ],
  // Importación de módulos necesarios para el funcionamiento del módulo
  imports: [
    CommonModule, // Módulo común de Angular
    EventosRoutingModule, // Módulo de rutas específicas para eventos
    NbCardModule, // Módulo de tarjetas de Nebular
    FormsModule // Módulo de formularios de Angular
  ]
})
export class EventosModule { }
