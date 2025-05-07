import { UsuarioModule } from './usuario/usuario.module';
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { TuristasModule } from './turistas/turistas.module';

// import de los nuevos modulos agregados
//import { UsuarioModule } from './usuario/usuario.module';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    TuristasModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    //nuevos modulos,
    UsuarioModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
