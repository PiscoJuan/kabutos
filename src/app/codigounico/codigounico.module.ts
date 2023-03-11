import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigounicoPageRoutingModule } from './codigounico-routing.module';

import { CodigounicoPage } from './codigounico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigounicoPageRoutingModule
  ],
  declarations: [CodigounicoPage]
})
export class CodigounicoPageModule {}
