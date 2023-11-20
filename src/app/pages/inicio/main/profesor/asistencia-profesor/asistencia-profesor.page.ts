import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import { ModalController } from '@ionic/angular';

import * as QRCode from 'qrcode-generator';


@Component({
  selector: 'app-asistencia-profesor',
  templateUrl: './asistencia-profesor.page.html',
  styleUrls: ['./asistencia-profesor.page.scss'],
})
export class AsistenciaProfesorPage {

  firebaseSvs = inject(FirebaseService);
  utilsSvs = inject(UtilsService)

  private qr: any;
  public qrImageUrl: string;

  constructor(private modalController: ModalController) { }


  asistenciasAlumno = [
    { alumno: '1. Marta González Herrera', estado: 'Ausente' },
    { alumno: '2. Alejandro López Rodríguez', estado: 'Ausente' },
    { alumno: '3. Carolina Pérez Vargas ', estado: 'Presente' },
    { alumno: '4. Javier García Jiménez ', estado: 'Ausente' },
    { alumno: '5. Isabel Torres Medina ', estado: 'Presente' },
    { alumno: '6. Guillermo Ramírez Silva ', estado: 'Presente' }
    ,
    // Agrega más registros de asistencia aquí
  ];



  generateQRCode() {
    const contenido = 'Estás presente';
    this.qr = QRCode(0, 'M');
    this.qr.addData(contenido);
    this.qr.make();

    // Obtener la URL de la imagen del código QR y asignarla a qrImageUrl
    this.qrImageUrl = this.qr.createDataURL(10, 5);
  }

  ngOnInit() {
  }

  

}
