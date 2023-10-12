import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomImputComponent } from './components/custom-imput/custom-imput.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateEstudiantesComponent } from './components/add-update-estudiantes/add-update-estudiantes.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CustomImputComponent,
    LogoComponent,
    AddUpdateEstudiantesComponent
  ],
  exports: [
    HeaderComponent,
    CustomImputComponent,
    ReactiveFormsModule,
    LogoComponent,
    AddUpdateEstudiantesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
