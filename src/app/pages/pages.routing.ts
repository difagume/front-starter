import { Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AboutComponent, DashboardComponent, DocsComponent, PerfilComponent, UsuariosComponent } from '.';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'about', component: AboutComponent },
      { path: 'docs', component: DocsComponent },
      { path: 'perfil', component: PerfilComponent },
      {
        path: 'usuarios', component: UsuariosComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: { only: ['ADMIN'], redirectTo: '/' }
        }
      }
    ]
  }
];
