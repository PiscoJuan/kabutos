import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { CorrectoPage } from '../aviso/correcto/correcto.page';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
import { TarjetaPage } from '../aviso/tarjeta/tarjeta.page';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  total:number;
  colorBack:any = "var(--ion-color-naranja-oscuro)";
  butAtras:any = "../assets/img/atras_naranja.png";
  constructor(private storage: Storage,
    private router: Router,
    private modalCtrl: ModalController,
    private navCtrlr: NavController, 
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.colorBack="#000000"
        this.butAtras= "../assets/img/atras_negro.png"
      }
    });
    this.storage.get('total').then((val) => {
      console.log(val);
      this.total=val;
    });
  }
  efectivo(){
    this.router.navigate(['/footer/efectivo']); 
    this.storage.set('tipoPago','Efectivo');
  }

  tarjeta(){
    this.router.navigate(['/footer/tarjeta']); 
    this.storage.set('tipoPago','Tarjeta');
    this.mensajeTarjeta("Para comprobar la legalidad de la compra","Recuerde que para retirar su pedido, debe presentar su cédula de identidad y tarjeta utilizada en la compra")
  }
  async mensajeCorrecto(titulo: string, mensaje: string) {
    const modal = await this.modalCtrl.create({
      component: CorrectoPage,
      cssClass: 'CorrectoProducto',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje
      }
    });
    return await modal.present();
  }

  async mensajeTarjeta(titulo: string, mensaje: string) {
    const modal = await this.modalCtrl.create({
      component: TarjetaPage,
      cssClass: 'DetallesTarjeta',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje
      }
    });
    return await modal.present();
  }


  atras(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.navCtrlr.back(animations)
  }

}
