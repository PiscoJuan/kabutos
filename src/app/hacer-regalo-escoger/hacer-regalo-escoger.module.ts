import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HacerRegaloEscogerPageRoutingModule } from './hacer-regalo-escoger-routing.module';

import { HacerRegaloEscogerPage } from './hacer-regalo-escoger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HacerRegaloEscogerPageRoutingModule
  ],
  declarations: [HacerRegaloEscogerPage]
})
export class HacerRegaloEscogerPageModule {}
