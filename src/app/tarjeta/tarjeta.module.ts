import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarjetaPageRoutingModule } from './tarjeta-routing.module';

import { TarjetaPage } from './tarjeta.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarjetaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TarjetaPage]
})
export class TarjetaPageModule {}
