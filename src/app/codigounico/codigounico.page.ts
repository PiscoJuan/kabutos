import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
//import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-codigounico',
  templateUrl: './codigounico.page.html',
  styleUrls: ['./codigounico.page.scss'],
})
export class CodigounicoPage implements OnInit {
  titulo = ""
  mensaje = ""

  constructor(public navCtrol: NavController, public navParams: NavParams,private  router:  Router,
    public modalCtrl: ModalController,
    private alert: AlertController,
    private loading: LoadingController,
    private socialSharing: SocialSharing,
    ) { }

  ngOnInit() {
    this.titulo = this.navParams.get('titulo')
    this.mensaje = this.navParams.get('mensaje')
  }
  salir(){
    this.modalCtrl.dismiss();
  }
  copiar(codigo){
    //console.log("funciona el click",codigo);
    navigator.clipboard.writeText(codigo);
    alert("Copiado al Portapapeles!")
  }

  compartir(mensaje){
    console.log("Ven a comprar en Cabutos! Te comparto mi codigo de Usuario: " + mensaje +" Descargala en AppStore: https://apps.apple.com/bo/app/cabutos/id1637263647 o en GooglePlay: https://play.google.com/store/apps/details?id=io.cabutos.starter.v1&hl=es&gl=US")
    var options = {
      message: "¡Hola! " + mensaje +" es mi código de Usuario Cabutos, el cuál puedes usar de manera muy fácil, ingresando al APP, para enviarme una tarjeta de regalos virtual o productos seleccionados.\nRecuerda que el amor es con hechos y no solo con palabras😌 Para mayor información puedes contactarte al 0988 277 349"
    };
    this.socialSharing.shareWithOptions(options);
    
  }

}
