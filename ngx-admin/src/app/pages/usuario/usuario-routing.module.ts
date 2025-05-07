import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoRecorridoUserComponent } from './recorrido-user/info-recorrido-user/info-recorrido-user.component';
import { RecorridoUserComponent } from './recorrido-user/recorrido-user.component';


const routes: Routes = [

    {path:'infoRecorrido',component: InfoRecorridoUserComponent},


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
