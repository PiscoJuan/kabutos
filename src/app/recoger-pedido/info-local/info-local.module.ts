import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoLocalPageRoutingModule } from './info-local-routing.module';

import { InfoLocalPage } from './info-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoLocalPageRoutingModule
  ],
  declarations: [InfoLocalPage]
})
export class InfoLocalPageModule {}
