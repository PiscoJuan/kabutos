import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroFbPageRoutingModule } from './registro-fb-routing.module';

import { RegistroFbPage } from './registro-fb.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroFbPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [RegistroFbPage]
})
export class RegistroFbPageModule {}
