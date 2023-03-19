import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {

  titulo = ""
  mensaje = ""
  button = false
  constructor(public navCtrol: NavController, public navParams: NavParams,private  router:  Router,
    public modalCtrl: ModalController,
    private alert: AlertController,
    private loading: LoadingController) { }

  ngOnInit() {
    this.titulo = this.navParams.get('titulo')
    this.mensaje = this.navParams.get('mensaje')
  }

  salir(){
    this.modalCtrl.dismiss();
  }
}