import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core';
import { AuthLayoutComponent } from './core';
import { AuthenticationGuard } from './core/authentication/authentication.guard';

export const AppRoutes: Routes = [
  {
    path: '', component: AdminLayoutComponent, canActivate: [AuthenticationGuard],
    children: [
      { path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'about', loadChildren: './pages/about/about.module#AboutModule' },
      { path: 'docs', loadChildren: './pages/docs/docs.module#DocsModule' },
      { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilModule' },
      { path: 'usuarios', loadChildren: './pages/usuarios/usuarios.module#UsuariosModule' }
    ]
  },
  {
    path: '', component: AuthLayoutComponent,
    children: [
      { path: 'authentication', loadChildren: './authentication/authentication.module#AuthenticationModule' },
      { path: 'error', loadChildren: './error/error.module#ErrorModule' }
    ]
  },
  { path: '**', redirectTo: 'error/404' }
  // { path: '**', redirectTo: '' }
];
