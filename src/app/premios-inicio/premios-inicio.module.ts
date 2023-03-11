import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PremiosInicioPageRoutingModule } from './premios-inicio-routing.module';

import { PremiosInicioPage } from './premios-inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PremiosInicioPageRoutingModule
  ],
  declarations: [PremiosInicioPage]
})
export class PremiosInicioPageModule {}
