import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage{
  correo: string = '';
  contrasena: string = '';

  
  constructor(private router: Router, private alertController: AlertController) {}

  async iniciarSesion() {
    if (!this.correo || !this.contrasena) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      this.router.navigate(['/inico']);
    }
  }

  

  ngOnInit() {
  }


  RecuperarContra(){
    this.router.navigate(['/recuperar-contra']);
  }
  Login(){
    this.router.navigate(['/home']);
  }
 

}
