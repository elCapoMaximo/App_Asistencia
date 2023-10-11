import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./page/home/home.page').then( (m) => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./page/home/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'inico',
    loadComponent: () => import('./page/home/inico/inico.page').then( m => m.InicoPage)
  },
  {
    path: 'recuperar-contra',
    loadComponent: () => import('./page/home/recuperar-contra/recuperar-contra.page').then( m => m.RecuperarContraPage)
  },
  {
    path: 'qr',
    loadComponent: () => import('./page/home/qr/qr.page').then( m => m.QRPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./page/home/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'main',
    loadComponent: () => import('./page/main/main.page').then( m => m.MainPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./page/main/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./page/main/profile/profile.page').then( m => m.ProfilePage)
  },
 
];
