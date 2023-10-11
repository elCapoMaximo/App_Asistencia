import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AngularFireModule } from '@angular/fire/compat'; // Asegúrate de usar la importación correcta
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // También puedes importar otros módulos de AngularFire aquí
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'nd'}),
    AngularFireModule.initializeApp(environment.firebaseConfig), // Configuración de Firebase
    AngularFireAuthModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
