import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerfilPageRoutingModule } from './perfil-routing.module';
import { PerfilPage } from './perfil.page';
import { ComponentsModule } from '../components/components.module';
import { EditarPerfilPageModule } from './editar-perfil/editar-perfil.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    ComponentsModule,
    EditarPerfilPageModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
