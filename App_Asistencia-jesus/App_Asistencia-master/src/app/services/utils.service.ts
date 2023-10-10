import { Injectable, inject } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  loastCtel = inject(ToastController);

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent'})
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.loastCtel.create(opts);
    toast.present();
  }

  constructor() { }
}
