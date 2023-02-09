import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElegirEstabPageRoutingModule } from './elegir-estab-routing.module';

import { ElegirEstabPage } from './elegir-estab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElegirEstabPageRoutingModule
  ],
  declarations: [ElegirEstabPage]
})
export class ElegirEstabPageModule {}
