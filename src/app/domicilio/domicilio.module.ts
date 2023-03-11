import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DomicilioPageRoutingModule } from './domicilio-routing.module';
import { DomicilioPage } from './domicilio.page';
import { ComponentsModule } from '../components/components.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomicilioPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [DomicilioPage],
  providers: [Geolocation]
})
export class DomicilioPageModule {}
