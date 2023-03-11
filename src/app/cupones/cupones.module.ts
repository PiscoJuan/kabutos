import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuponesPageRoutingModule } from './cupones-routing.module';

import { CuponesPage } from './cupones.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuponesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CuponesPage]
})
export class CuponesPageModule {}
