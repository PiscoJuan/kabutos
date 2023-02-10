import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import {ProductoService} from '../servicios/producto.service';
import { Storage } from '@ionic/storage';
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
  colorBack: any = "color: var(--ion-color-naranja-oscuro)"
  constructor(public navCtrol: NavController, public navParams: NavParams,private  router:  Router,
    public modalCtrl: ModalController,
    private alert: AlertController,
    private storage: Storage,
    public productoService: ProductoService,
    private loading: LoadingController) { }

  ngOnInit() {
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val)==2){
        this.colorBack="color: black"
      }
    });
    this.imagen = this.navParams.get('imagen')
    this.nombre = this.navParams.get('nombre')
    this.descripcion = this.navParams.get('descripcion')
    this.precio = this.navParams.get('precio')
  }

  salir(){
    this.modalCtrl.dismiss();
  }
}
