import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from '@angular/router';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@Component({
  selector: 'app-inico',
  templateUrl: './inico.page.html',
  styleUrls: ['./inico.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,SharedModule]
})
export class InicoPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  Login(){
    this.router.navigate(['/login']);
  }
   
  qr(){
    this.router.navigate(['/qr']);
  }
}
