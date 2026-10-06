import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ComidaTablePageComponent } from './pages/comida-table-page/comida-table-page.component';
import { ComidaFormComponent } from './pages/comida-form/comida-form.component';
import { ComidaDetailComponent } from './pages/comida-detail/comida-detail.component';
import { ClienteTablePageComponent } from './pages/cliente-table-page/cliente-table-page.component';
import { ClienteFormComponent } from './pages/cliente-form/cliente-form.component';
import { ClienteDetailComponent } from './pages/cliente-detail/cliente-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'comidas',
    component: ComidaTablePageComponent,
  },
  {
    path: 'comidas/tabla',
    component: ComidaTablePageComponent,
  },
  {
    path: 'comidas/tarjetas',
    component: ComidaTablePageComponent,
  },
  {
    path: 'comidas/new',
    component: ComidaFormComponent,
  },
  {
    path: 'comidas/crear',
    component: ComidaFormComponent,
  },
  {
    path: 'comidas/editar/:id',
    component: ComidaFormComponent,
  },
  {
    path: 'comidas/:id',
    component: ComidaDetailComponent,
  },
  {
    path: 'clientes',
    component: ClienteTablePageComponent,
  },
  {
    path: 'cliente/portal',
    component: ClienteTablePageComponent,
  },
  {
    path: 'clientes/new',
    component: ClienteFormComponent,
  },
  {
    path: 'clientes/crear',
    component: ClienteFormComponent,
  },
  {
    path: 'clientes/editar/:id',
    component: ClienteFormComponent,
  },
  {
    path: 'clientes/:id',
    component: ClienteDetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
