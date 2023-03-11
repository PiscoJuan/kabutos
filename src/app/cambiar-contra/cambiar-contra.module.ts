import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarContraPageRoutingModule } from './cambiar-contra-routing.module';

import { CambiarContraPage } from './cambiar-contra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarContraPageRoutingModule
  ],
  declarations: [CambiarContraPage]
})
export class CambiarContraPageModule {}
