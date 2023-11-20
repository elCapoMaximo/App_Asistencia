import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BrowserQRCodeReader, NotFoundException } from '@zxing/library';

import { Capacitor } from '@capacitor/core';

import { Plugins } from '@capacitor/core';

const { Modals, Toast } = Capacitor as any;


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  firebaseSvs = inject(FirebaseService);
  utilsSvs = inject(UtilsService)

  user(): User {
    return this.utilsSvs.getFromLocalStorage('user');
  }

  asistencias = [
    { fecha: 'Lunes,02 de OCTUBRE de 2023', estado: 'Presente' },
    { fecha: 'Martes,03 de OCUTUBRE de 2023', estado: 'Ausente' },
    { fecha: 'Jueves,12 de OCTUBRE DE 2023 ', estado: 'Presente' },
    { fecha: 'Jueves,19 de OCTUBRE DE 2023 ', estado: 'Ausente' },
    { fecha: 'Jueves,26 de OCTUBRE DE 2023 ', estado: 'Ausente' },
    { fecha: 'Lunes,30 de OCTUBRE DE 2023 ', estado: 'Presente' }
    ,
    // Agrega más registros de asistencia aquí
  ];

  constructor() { }

  ngOnInit() {
  }

  async scanQRCode() {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    try {
      const codeReader = new BrowserQRCodeReader();
      const result = await codeReader.decodeFromImage(undefined, photo.base64String);
      const qrContent = result.getText();

      // Muestra el contenido del QR en una alerta
      this.showAlert('Contenido del QR', qrContent);

      // Opcional: Puedes hacer algo más con el contenido, como enviarlo al servidor.

    } catch (error) {
      if (error instanceof NotFoundException) {
        console.log('No se encontró ningún código QR en la imagen.');
        this.showToast('No se encontró ningún código QR en la imagen.');
      } else {
        console.error('Error al decodificar el código QR:', error);
        this.showToast('Error al decodificar el código QR.');
      }
    }
  }

  async showAlert(title: string, message: string) {
    await Modals.alert({
      title: title,
      message: message,
    });
  }

  async showToast(message: string) {
    await Toast.show({
      text: message,
      duration: 'short',
    });
  }

  

}