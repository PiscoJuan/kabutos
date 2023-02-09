import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialMensajesPageRoutingModule } from './historial-mensajes-routing.module';

import { HistorialMensajesPage } from './historial-mensajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialMensajesPageRoutingModule
  ],
  declarations: [HistorialMensajesPage]
})
export class HistorialMensajesPageModule {}
