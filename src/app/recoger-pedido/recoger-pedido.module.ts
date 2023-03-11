import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecogerPedidoPageRoutingModule } from './recoger-pedido-routing.module';

import { RecogerPedidoPage } from './recoger-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecogerPedidoPageRoutingModule
  ],
  declarations: [RecogerPedidoPage]
})
export class RecogerPedidoPageModule {}
