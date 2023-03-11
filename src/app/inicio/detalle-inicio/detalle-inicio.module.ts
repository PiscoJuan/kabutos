import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleInicioPageRoutingModule } from './detalle-inicio-routing.module';

import { DetalleInicioPage } from './detalle-inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleInicioPageRoutingModule
  ],
  declarations: [DetalleInicioPage]
})
export class DetalleInicioPageModule {}
