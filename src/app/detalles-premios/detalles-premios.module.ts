import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesPremiosPageRoutingModule } from './detalles-premios-routing.module';

import { DetallesPremiosPage } from './detalles-premios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesPremiosPageRoutingModule
  ],
  declarations: [DetallesPremiosPage]
})
export class DetallesPremiosPageModule {}
