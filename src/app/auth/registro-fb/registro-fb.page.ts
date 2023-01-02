import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from  "@angular/router";
import { LoadingController } from '@ionic/angular';
import { AlertController, ToastController,Platform } from '@ionic/angular';

@Component({
  selector: 'app-registro-fb',
  templateUrl: './registro-fb.page.html',
  styleUrls: ['./registro-fb.page.scss'],
})
export class RegistroFbPage implements OnInit {
  opcion: string  = '0';
  textInput: string = null;
  verSeleccion: string = '';
  Registro : {};
  RegistroInput: string ='';

  constructor(private  authService:  AuthService,private  router:  Router, private loading: LoadingController,
    private alert: AlertController,
    private toast: ToastController,) { }

  ngOnInit() {
  }

  async mensaje(titulo:string,subtitulo:string,mensaje:string) {
    const alert = await this.alert.create({
      cssClass: titulo,
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }
}
