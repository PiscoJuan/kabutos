import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HacerRegaloPuntosPageRoutingModule } from './hacer-regalo-puntos-routing.module';

import { HacerRegaloPuntosPage } from './hacer-regalo-puntos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HacerRegaloPuntosPageRoutingModule
  ],
  declarations: [HacerRegaloPuntosPage]
})
export class HacerRegaloPuntosPageModule {}
