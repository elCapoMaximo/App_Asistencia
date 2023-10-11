import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from 'src/app/models/user.model';
import { UtilsService } from '../../../services/utils.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,SharedModule]
})
export class RegisterPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required, Validators.minLength(4)])
  })

  firebaseSvs = inject(FirebaseService);
  utilsSvs = inject(UtilsService);

  ngOnInit() {
  }

 async submit(){
    if (this.form.valid){

      const loading = await this.utilsSvs.loading();
      await loading.present();

      this.firebaseSvs.signUp(this.form.value as User).then(async res => {

        await this.firebaseSvs.updateUser(this.form.value.name);

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid);

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

  async setUserInfo(uid: string){
    if (this.form.valid){

      const loading = await this.utilsSvs.loading();
      await loading.present();

      let path = 'users/${uid}';
      delete this.form.value.password;

      this.firebaseSvs.setDocument(path, this.form.value).then(async res => {

        this.utilsSvs.saveInLocalStorage('user',this.form.value);
        this.utilsSvs.routerLink('/main/home');
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

}
