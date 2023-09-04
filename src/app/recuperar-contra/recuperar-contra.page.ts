import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RecuperarContraPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  IniciarSesion(){
    this.router.navigate(['/inico']);
  }

  Login(){
    this.router.navigate(['/login']);
  }

}
