import { Routes } from '@angular/router';
import { AboutComponent, DashboardComponent, DocsComponent, PerfilComponent, UsuariosComponent } from '.';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'about', component: AboutComponent },
      { path: 'docs', component: DocsComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'usuarios', component: UsuariosComponent }
    ]
  }
];
