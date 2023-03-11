import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PagarPageRoutingModule } from './pagar-routing.module';
import { PagarPage } from './pagar.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagarPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [PagarPage]
})
export class PagarPageModule {}
