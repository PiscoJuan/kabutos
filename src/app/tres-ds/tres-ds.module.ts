import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TresDsPageRoutingModule } from './tres-ds-routing.module';

import { TresDsPage } from './tres-ds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TresDsPageRoutingModule
  ],
  declarations: [TresDsPage]
})
export class TresDsPageModule {}
