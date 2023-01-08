import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingCartPageModule } from './shopping-cart/shopping-cart.module';

import { HttpClientModule } from '@angular/common/http';

import {ProductoService} from '../app/servicios/producto.service';
import { AuthModule } from  './auth/auth.module';

import { ServiciosModule } from  './auth/servicios/servicios.module';

import { AngularFirestoreModule } from "@angular/fire/firestore"; //Modulo Firestore (BD)
import { AngularFireAuthModule } from "@angular/fire/auth";  //Modulo de authenticacion
import { AngularFireModule } from "@angular/fire";            //Modulo para inicializar y que todo funcione bien vergas
import { firebaseConfig} from "../environments/environment";     // aqui se encuentra una variable de configuracion para inicializar firebase
import {FooterPage} from 'src/app/footer/footer.page'
import { HTTP } from '@ionic-native/http/ngx';
import { Facebook/*, FacebookLoginResponse*/ } from '@ionic-native/facebook/ngx'; //Modulo de Facebook
import {ModalPage} from '././modal/modal.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import { SignInWithApple } from '@awesome-cordova-plugins/sign-in-with-apple/ngx';

@NgModule({
  declarations: [AppComponent],
//  declarations: [AppComponent],

  imports: [BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  HttpClientModule,
   IonicModule.forRoot(), IonicStorageModule.forRoot({
    name: '__mydb',
driverOrder: ['indexeddb', 'sqlite', 'websql']
  }),AppRoutingModule, AuthModule,ServiciosModule],
  providers: [
    StatusBar,
    ProductoService,
    Facebook,
    SplashScreen,
    FirebaseX,
    NativeStorage,
    HTTP,
    SignInWithApple,
    SocialSharing,
    
    FooterPage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
