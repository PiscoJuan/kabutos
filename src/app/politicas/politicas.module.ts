import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticasPageRoutingModule } from './politicas-routing.module';

import { PoliticasPage } from './politicas.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PoliticasPage]
})
export class PoliticasPageModule {}
