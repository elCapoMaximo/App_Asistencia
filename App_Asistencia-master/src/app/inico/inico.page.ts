import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
  selector: 'app-inico',
  templateUrl: './inico.page.html',
  styleUrls: ['./inico.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InicoPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  Login(){
    this.router.navigate(['/login']);
  }

}
