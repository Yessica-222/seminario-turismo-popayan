import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { Component, NgModule, OnInit } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { MiComponenteComponent } from './mi-componente/mi-componente.component';
@Component({
  template: '',
})
export class RedirectComponent implements OnInit {
constructor() {}

ngOnInit() {
  window.location.href = 'https://turismo13.mydurable.com/?pt=NjU3MzhjMTRhOWFkZmQyODU0MjBkZTdlOjE3MDIwNzIwODkuMjE3OnByZXZpZXc=#';
}
}

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'ver-sitio-web',
    component: MiComponenteComponent,
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
