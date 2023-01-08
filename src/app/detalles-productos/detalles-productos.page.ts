import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import {ProductoService} from '../servicios/producto.service';

@Component({
  selector: 'app-detalles-productos',
  templateUrl: './detalles-productos.page.html',
  styleUrls: ['./detalles-productos.page.scss'],
})
export class DetallesProductosPage implements OnInit {

  imagen = ""
  nombre = ""
  descripcion = ""
  precio = ""
  constructor(public navCtrol: NavController, public navParams: NavParams,private  router:  Router,
    public modalCtrl: ModalController,
    private alert: AlertController,
    public productoService: ProductoService,
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
