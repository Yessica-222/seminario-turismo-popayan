import { RouterModule, Routes } from '@angular/router';
import { Component, NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { InfoRecorridoUserComponent } from './usuario/recorrido-user/info-recorrido-user/info-recorrido-user.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [

  //ruta para el menu del Usuario

  //{path: 'home', component: HomeComponent },
  {path: 'usuario', component: UsuarioComponent},

  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module')
    .then(m => m.UsuarioModule),
  },




  //fin rutas usuario

    {
      path: 'seguridad',
      loadChildren: () => import('./seguridad/seguridad.module')
      .then(m => m.SeguridadModule),
    },
    {
      path: 'turistas',
      loadChildren: () => import('./turistas/turistas.module')
      .then(m => m.TuristasModule),
    },
    {
      path: 'eventos',
      loadChildren: () => import('./eventos/eventos.module')
      .then(m => m.EventosModule),
    },
    {
      path: 'recorridos',
      loadChildren: () => import('./recorridos/recorridos.module')
      .then(m => m.RecorridosModule),
    },
    {
      path: 'experiencia-turistas',
      loadChildren: () => import('./experiencia-turistas/experiencia-turistas.module')
      .then(m => m.ExperienciaTuristasModule),
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    // {
    //   path: '',
    //   redirectTo: 'dashboard',
    //   pathMatch: 'full',
    // },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
