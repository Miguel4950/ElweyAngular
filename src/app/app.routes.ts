import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ComidaTablePageComponent } from './pages/comida-table-page/comida-table-page.component';
import { ComidaFormComponent } from './pages/comida-form/comida-form.component';
import { ComidaDetailComponent } from './pages/comida-detail/comida-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { MiPortalComponent } from './pages/mi-portal/mi-portal.component';
import { PedidosPageComponent } from './pages/pedidos-page/pedidos-page.component';
import { PedidoDetailComponent } from './pages/pedido-detail/pedido-detail.component';
import { AdminClientesComponent } from './pages/admin-clientes/admin-clientes.component';

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
    path: 'admin/productos',
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
    path: 'pedidos',
    component: PedidosPageComponent,
  },
  {
    path: 'pedidos/:id',
    component: PedidoDetailComponent,
  },
  {
    path: 'clientes',
    component: AdminClientesComponent,
  },
  {
    path: 'admin/vertodo',
    component: AdminClientesComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'cliente/portal',
    component: MiPortalComponent,
  },
  {
    path: 'cliente/portal/:id',
    component: MiPortalComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
