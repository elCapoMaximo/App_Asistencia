import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from 'src/app/models/user.model';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    SharedModule]
})
export class RecuperarContraPage {

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email])
  })

  firebaseSvs = inject(FirebaseService);
  utilsSvs = inject(UtilsService);

  constructor(
    private router: Router,

  ) {}

  ngOnInit() {
  }

 async submit(){
    if (this.form.valid){

      const loading = await this.utilsSvs.loading();
      await loading.present();

      this.firebaseSvs.sendRecoveryEmail(this.form.value.email).then(res => {

        this.utilsSvs.presentToast({
          message: 'correo enviado con exito',
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'main-outline'
        })

        this.utilsSvs.routerLink('/login');
        this.form.reset();

      }).catch(error => {
        console.log(error);

        this.utilsSvs.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'aletr-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  IniciarSesion(){
    this.router.navigate(['/inico']);
  }

  Login(){
    this.router.navigate(['/login']);
  }

}
