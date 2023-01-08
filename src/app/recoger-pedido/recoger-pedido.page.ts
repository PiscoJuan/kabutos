import { Component, OnInit } from '@angular/core';
import { EstablecimientoService } from '../servicios/establecimiento.service';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import {IncorrectoPage} from '../aviso/incorrecto/incorrecto.page';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'app-recoger-pedido',
  templateUrl: './recoger-pedido.page.html',
  styleUrls: ['./recoger-pedido.page.scss'],
})
export class RecogerPedidoPage implements OnInit {
  total:number;
  locales: {};
  loading:any;

  constructor(
    public establecimientoService: EstablecimientoService,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    private navCtrlr: NavController, 
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.datos()
  }

  ionViewDidEnter() {
    console.log("didEnter");
    this.storage.get('total').then((val) => {
      console.log(val);
      this.total=val;
    });
  }

  async datos(){
    await this.showLoading2();
    this.establecimientoService.getEstablecimiento()
        .pipe(
            finalize(async () => {
              await this.loading.dismiss();
            })
        )
        .subscribe(
            data => {
              console.log(data)
              this.locales = data;
              if (Object.keys(this.locales).length === 0) {
                this.mensajeIncorrecto("Establecimientos no encontrados", "No existen locales para presentar")
              }
            },
            err => {
              this.mensajeIncorrecto("Algo Salio mal","Fallo en la conexión")
            }
        );
  }

  async mensajeIncorrecto(titulo:string,mensaje:string){
    const modal = await this.modalController.create({
      component: IncorrectoPage,
      cssClass: 'IncorrectoProducto',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje
      }
    });
    return await modal.present();
  }

  async showLoading2() {
    this.loading=await this.loadingCtrl.create({
      message: 'Loading.....'
    });
      await this.loading.present(); 

  }

  confirmar(id){
    this.storage.set('direccionEntrega',id)
    this.router.navigate(['/footer/recoger-pedido/info-local']);
  }

  atras(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.navCtrlr.back(animations)
  }

}
