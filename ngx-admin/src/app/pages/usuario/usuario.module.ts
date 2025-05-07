import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { UsuarioComponent } from './usuario.component';

 //importar modulo a utilizar en este modulo, pas1
import { RecorridosModule } from '../recorridos/recorridos.module';

// Componentes creados en este modulo
import { UsuarioRoutingModule } from './usuario-routing.module';
import { RecorridoUserComponent } from './recorrido-user/recorrido-user.component';
import { InfoRecorridoUserComponent } from './recorrido-user/info-recorrido-user/info-recorrido-user.component';
import { CarouselComponent } from '../carousel/carousel.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    //Componentes creados en este modulo
    RecorridoUserComponent,
    InfoRecorridoUserComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    //importar modulos pas2
    RecorridosModule,
    UsuarioRoutingModule,
  ]
})
export class UsuarioModule { }
