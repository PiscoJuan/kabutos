import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NombreComponentePageRoutingModule } from './nombre-componente-routing.module';

import { NombreComponentePage } from './nombre-componente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NombreComponentePageRoutingModule
  ],
  declarations: [NombreComponentePage]
})
export class NombreComponentePageModule {}
