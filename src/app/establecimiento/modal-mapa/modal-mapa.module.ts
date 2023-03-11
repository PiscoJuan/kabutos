import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMapaPageRoutingModule } from './modal-mapa-routing.module';

import { ModalMapaPage } from './modal-mapa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMapaPageRoutingModule
  ],
  declarations: [ModalMapaPage]
})
export class ModalMapaPageModule {}
