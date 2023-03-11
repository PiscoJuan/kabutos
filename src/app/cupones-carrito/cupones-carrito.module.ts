import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuponesCarritoPageRoutingModule } from './cupones-carrito-routing.module';

import { CuponesCarritoPage } from './cupones-carrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuponesCarritoPageRoutingModule
  ],
  declarations: [CuponesCarritoPage]
})
export class CuponesCarritoPageModule {}
