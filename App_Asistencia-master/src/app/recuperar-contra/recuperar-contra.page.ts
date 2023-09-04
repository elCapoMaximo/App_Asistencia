import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RecuperarContraPage {
  correo: string = '';

  constructor(private router:Router, private alertController: AlertController) { }

  async recuperarContrasena() {
    if (!this.correo) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Por favor, ingresa tu dirección de correo electrónico.',
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: `Solicitud de recuperación de contraseña para ${this.correo}`,
        buttons:[
                {
                  text: 'OK',
                  handler: () => {
                    this.router.navigate(['/login']);
                  }
                }
              ],
      });

      await alert.present();
    }
  }

  ngOnInit() {
  }

  IniciarSesion(){
    this.router.navigate(['/inico']);
  }

  Login(){
    this.router.navigate(['/login']);
  }

}
