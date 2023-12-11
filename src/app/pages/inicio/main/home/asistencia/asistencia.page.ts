import { Component, OnInit, ViewChild, NgZone, inject } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { AlertController } from '@ionic/angular';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import { User } from 'src/app/models/user.model';
import { Asignaturas } from 'src/app/models/asignaturas.model';
import { Asistencia } from 'src/app/models/asistencia.model';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})

export class AsistenciaPage implements OnInit {
  @ViewChild('scanner', { static: true }) scanner: ZXingScannerComponent;
  isScannerActive: boolean = false;
  presentMessage: string = '';

 // firebaseSvs = inject(FirebaseService);
 // utilsSvs = inject(UtilsService)


  private qrCodeRead: boolean = false;

  constructor(
    private ngZone: NgZone,
    private alertController: AlertController, ) {}

  firebaseSvs = inject(FirebaseService);
  utilsSvs = inject(UtilsService)


  ngOnInit() {
    // No inicia automáticamente al cargar la página
  }

  asistenciaa: Asistencia[] = [];

  ionViewWillEnter(){
    this.getAsistencia();
  }  
  
  asistencia():Asistencia {
    return this.utilsSvs.getFromLocalStorage('asistencia')
  }

  //obtener asignaturas
  getAsistencia() {
    let path = 'asistencia';  // Ajusta la ruta según tu estructura de Firestore
  
    let sub = this.firebaseSvs.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.asistenciaa = res;
        sub.unsubscribe();
      }
    });
  }

  startScanner() {
    this.ngZone.run(() => {
      this.isScannerActive = true;
    });
  }

  async updateAsistencia(): Promise<void> {
    const asistenciaId = 'xySFRkOshQHDNnbIbyy0';
    const path = `asistencia/${asistenciaId}`;
  
    const now = new Date();
    const formattedDate = this.getFormattedDate();
  
    // Actualiza los datos en Firebase
    await this.firebaseSvs.updateDocument(path, {
      fecha: formattedDate,
      asistencia: 'presente'
    });
  }

  async handleBarcodeResult(event: any): Promise<void> {
    if (this.qrCodeRead) {
      // Si el código ya se ha leído, no hagas nada
      const alert = await this.alertController.create({
        header: 'Ya estás presente',
        message: 'Has registrado tu asistencia previamente.',
        buttons: ['OK']
      });
  
      await alert.present();
  
      // Puedes detener el escáner después de mostrar la alerta
      this.isScannerActive = false;
      return;
    }
    console.log('Código escaneado:', event.text);

    // Obtén la fecha y hora actual
    const now = new Date();

    // Verifica si la hora actual está dentro del margen permitido (22:30 - 20:00)
    const allowedStartTime = new Date(now);
    allowedStartTime.setHours(22, 30, 0, 0); // 22:30:00

    const allowedEndTime = new Date(now);
    allowedEndTime.setHours(23, 30, 0, 0); // 23:00:00

    if (now < allowedStartTime || now > allowedEndTime) {
      // Si no está dentro del margen permitido, muestra un mensaje de error
      const alert = await this.alertController.create({
        header: 'Código QR no leido',
        message: 'Fuera del horario permitido para registrar asistencia',
        buttons: ['OK']
      });

      await alert.present();
      // Puedes detener el escáner después de mostrar la alerta
      this.isScannerActive = false;
      return;
    }else {

      // Realiza la acción específica (por ejemplo, actualizar el mensaje en HTML)
      this.presentMessage = `Presente el ${this.getFormattedDate()}`;
    
      // Muestra una alerta con el mensaje "Código QR leído"
      const alert = await this.alertController.create({
        header: 'Código QR leído',
        message: 'Estas presente',
        buttons: ['OK']
      });
    
      await alert.present();
    
      // Puedes detener el escáner después de un escaneo exitoso si lo deseas
      this.isScannerActive = false;
    
      // Marca el código QR como leído
      this.qrCodeRead = true;

      this.updateAsistencia().then(() => {
        console.log('Asistencia actualizada en Firebase');
      });
    }
  }

  resetQRCodeStatus() {
    this.qrCodeRead = false;
  }
  
  getFormattedDate(): string {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0'); // Obtener el día y ajustar el formato
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes y ajustar el formato
    const year = now.getFullYear().toString().slice(-2); // Obtener los últimos dos dígitos del año
  
    return `${day}-${month}-${year}`;
  }

}