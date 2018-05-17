import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core';
import { AuthLayoutComponent } from './core';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [
    { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'docs', loadChildren: './docs/docs.module#DocsModule' }
  ]
}, {
  path: '', component: AuthLayoutComponent,
  children: [{
    path: 'authentication', loadChildren: './authentication/authentication.module#AuthenticationModule'
  }, {
    path: 'error', loadChildren: './error/error.module#ErrorModule'
  }]
}, {
  path: '**', redirectTo: 'error/404'
}];
