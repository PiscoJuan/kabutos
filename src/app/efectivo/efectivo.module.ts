import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EfectivoPageRoutingModule } from './efectivo-routing.module';

import { EfectivoPage } from './efectivo.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EfectivoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EfectivoPage]
})
export class EfectivoPageModule {}
