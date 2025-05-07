import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecorridosRoutingModule } from './recorridos-routing.module';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  // Declaración de los componentes pertenecientes a este módulo
  declarations: [
    CrearComponent,
    ListarComponent
  ],
  // Importación de módulos necesarios para este módulo
  imports: [
    CommonModule,
    RecorridosRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
// Definición del módulo RecorridosModule
export class RecorridosModule { }
