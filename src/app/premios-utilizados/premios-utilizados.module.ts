import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PremiosUtilizadosPageRoutingModule } from './premios-utilizados-routing.module';

import { PremiosUtilizadosPage } from './premios-utilizados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PremiosUtilizadosPageRoutingModule
  ],
  declarations: [PremiosUtilizadosPage]
})
export class PremiosUtilizadosPageModule {}
