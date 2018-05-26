import { Routes } from '@angular/router';
import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { AuthenticationGuard } from './core/authentication/authentication.guard';

export const AppRoutes: Routes = [
  {
    path: '', component: AdminLayoutComponent, canActivate: [AuthenticationGuard],
    children: [
      { path: '', loadChildren: './pages/pages.module#PagesModule' }
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
