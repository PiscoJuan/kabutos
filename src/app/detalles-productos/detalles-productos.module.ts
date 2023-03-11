import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesProductosPageRoutingModule } from './detalles-productos-routing.module';

import { DetallesProductosPage } from './detalles-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesProductosPageRoutingModule
  ],
  declarations: [DetallesProductosPage]
})
export class DetallesProductosPageModule {}
