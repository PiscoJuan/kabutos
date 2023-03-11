import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaTarjetaPageRoutingModule } from './nueva-tarjeta-routing.module';

import { NuevaTarjetaPage } from './nueva-tarjeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaTarjetaPageRoutingModule
  ],
  declarations: [NuevaTarjetaPage]
})
export class NuevaTarjetaPageModule {}
