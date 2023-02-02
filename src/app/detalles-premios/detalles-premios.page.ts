import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detalles-premios',
  templateUrl: './detalles-premios.page.html',
  styleUrls: ['./detalles-premios.page.scss'],
})
export class DetallesPremiosPage implements OnInit {
imagen = ""
nombre = ""
descripcion = ""
precio = ""
constructor(public navCtrol: NavController, public navParams: NavParams,private  router:  Router,
  public modalCtrl: ModalController,
  private alert: AlertController,
  private loading: LoadingController) { }

ngOnInit() {
  this.imagen = this.navParams.get('imagen')
  this.nombre = this.navParams.get('nombre')
  this.descripcion = this.navParams.get('descripcion')
  this.precio = this.navParams.get('precio')
}

salir(){
  this.modalCtrl.dismiss();
}
}

