import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { UsuariosComponent } from './Administracion/usuarios/usuarios.component';
import { RolesComponent } from './Administracion/roles/roles.component';
import { AccesosComponent } from './Administracion/accesos/accesos.component';
import { NuevoClienteComponent } from './cliente/nuevo-cliente/nuevo-cliente.component';
import { ProductoComponent } from './producto/producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto/nuevo-producto.component';

export const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    pathMatch: 'full',
  },
  {
    path: 'nuevo-cliente',
    component: NuevoClienteComponent,
    pathMatch: 'full',
  },
  {
    path: 'editar-cliente/:parametro',
    component: NuevoClienteComponent,
    pathMatch: 'full',
  },
  {
    path: 'productos',
    component: ProductoComponent,
    pathMatch: 'full',
  },
  {
    path: 'nuevo-producto',
    component: NuevoProductoComponent,
    pathMatch: 'full',
  },
  {
    path: 'editar-producto/:parametro',
    component: NuevoProductoComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    children: [
      {
        path: 'admin',
        component: UsuariosComponent,
      },
      {
        path: 'roles',
        component: RolesComponent,
      },
      {
        path: 'accesos',
        component: AccesosComponent,
      },
    ],
  },
];
