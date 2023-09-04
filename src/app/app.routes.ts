import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },  {
    path: 'inico',
    loadComponent: () => import('./inico/inico.page').then( m => m.InicoPage)
  },
  {
    path: 'recuperar-contra',
    loadComponent: () => import('./recuperar-contra/recuperar-contra.page').then( m => m.RecuperarContraPage)
  }

];
