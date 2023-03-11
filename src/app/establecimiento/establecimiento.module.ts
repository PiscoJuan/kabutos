import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EstablecimientoPageRoutingModule } from './establecimiento-routing.module';
import { EstablecimientoPage } from './establecimiento.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstablecimientoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EstablecimientoPage]
})
export class EstablecimientoPageModule {}
