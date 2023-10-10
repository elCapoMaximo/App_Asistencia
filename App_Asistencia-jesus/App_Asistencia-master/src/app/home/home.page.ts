import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';  
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    SharedModule],
})
export class HomePage {
  constructor(private router: Router) {}

  go() {  
    this.router.navigate(['login']);  
  }  
}


