import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FirebaseService } from '../services/firebase.service';
import { User } from 'src/app/models/user.model';
import { UtilsService } from '../services/utils.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    SharedModule]
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
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

      this.firebaseSvs.signIn(this.form.value as User).then(res => {

        console.log(res);

      }).catch(error => {
        console.log(error);

        this.utilsSvs.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'aletr-circle-out'

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

      let path = 'users/{uid}'
      delete this.form.value.password;

      this.firebaseSvs.setDocument(path, this.form.value).then(res => {

        console.log(res);

      }).catch(error => {
        console.log(error);

        this.utilsSvs.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'aletr-circle-out'

        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  recuperar() {  
    this.router.navigate(['recuperar-contra']);  
  } 

}
