import { Component,Input,OnInit ,inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { asignaturas } from 'src/app/models/asignaturas.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  firebaseSvs = inject(FirebaseService);
  utilsSvs = inject(UtilsService)

  user(): User {
    return this.utilsSvs.getFromLocalStorage('user');
  }

  //obtener datos

  async takeUser(){
    let user = this.user();
    let path = `users/${user.uid}`

    const loading = await this.utilsSvs.loading();
    await loading.present();
 
  }
  //cerrar Sesion

  signDut(){
    this.firebaseSvs.signOut();
  }

}
