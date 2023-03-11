import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HacerRegaloMontoPageRoutingModule } from './hacer-regalo-monto-routing.module';

import { HacerRegaloMontoPage } from './hacer-regalo-monto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HacerRegaloMontoPageRoutingModule
  ],
  declarations: [HacerRegaloMontoPage]
})
export class HacerRegaloMontoPageModule {}
