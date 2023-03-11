import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  titulo = ""
  mensaje = ""
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
