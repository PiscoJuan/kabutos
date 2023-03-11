import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterPageRoutingModule } from './footer-routing.module';
import { FooterPage } from './footer.page';
import { ProductoPageModule } from 'src/app/producto/producto.module';
import { LoginPageModule } from 'src/app/auth/login/login/login.module';
import { PerfilPageModule } from 'src/app/perfil/perfil.module';
import { EditarPerfilPageModule } from 'src/app/perfil/editar-perfil/editar-perfil.module';
import { NotificacionPageModule } from 'src/app/notificacion/notificacion.module';
import { ContactoPageModule } from 'src/app/contacto/contacto.module';
import { EstablecimientoPageModule } from 'src/app/establecimiento/establecimiento.module';
import { ShoppingCartPageModule } from 'src/app/shopping-cart/shopping-cart.module';
import { OfertasPageModule } from 'src/app/ofertas/ofertas.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterPageRoutingModule,
    NotificacionPageModule,
    EditarPerfilPageModule,
    LoginPageModule,
    PerfilPageModule,
    ProductoPageModule,
    ContactoPageModule ,
    EstablecimientoPageModule,
    ShoppingCartPageModule ,
    OfertasPageModule
  ],
  declarations: [FooterPage]
})
export class FooterPageModule {}
