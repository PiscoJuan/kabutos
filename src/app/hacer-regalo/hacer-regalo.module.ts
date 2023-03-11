import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HacerRegaloPageRoutingModule } from './hacer-regalo-routing.module';

import { HacerRegaloPage } from './hacer-regalo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HacerRegaloPageRoutingModule
  ],
  declarations: [HacerRegaloPage]
})
export class HacerRegaloPageModule {}
