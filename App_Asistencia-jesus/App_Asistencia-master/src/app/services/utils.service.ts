import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  // Loading
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  // Toast
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // Navegación a rutas
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // Guardar en el almacenamiento local
  saveInLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtener desde el almacenamiento local
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
