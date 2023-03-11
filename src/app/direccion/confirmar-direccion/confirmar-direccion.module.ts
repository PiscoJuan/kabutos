import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarDireccionPageRoutingModule } from './confirmar-direccion-routing.module';

import { ConfirmarDireccionPage } from './confirmar-direccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarDireccionPageRoutingModule
  ],
  declarations: [ConfirmarDireccionPage]
})
export class ConfirmarDireccionPageModule {}
