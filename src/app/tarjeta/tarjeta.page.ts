import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController, ModalController,NavController } from '@ionic/angular';
import { NuevaTarjetaPage } from './nueva-tarjeta/nueva-tarjeta.page';
import { TarjetaService } from '../servicios/tarjeta.service';
import { finalize } from 'rxjs/operators';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {

  total: number;
  id;
  loading: any;
  tarjetas: any;
  numTarjetas:any;
  butAtras:any = "../assets/img/atras_naranja.png";
  imgAdd:any = "../assets/img/agregar_2.png";
  colorBack:any = "var(--ion-color-naranja-oscuro)";
  constructor(
    private router: Router,
    private storage: Storage,
    public modalController: ModalController,
    public tarjetaService: TarjetaService,
    private loadingCtrl: LoadingController,
    private navCtrlr: NavController, 
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.colorBack="#000000"
        this.imgAdd= "../assets/img/agregar_2black.png"
        this.butAtras= "../assets/img/atras_negro.png"
      }
    });
    console.log("didEnter");
    this.storage.get('total').then((val) => {
      console.log(val);
      this.total = val;
    });
    this.storage.get('id').then((val) => {
      if (val != null) {
        this.id = val;
      }
    });
    this.datos();
  }

  pagar(token, type, number, name) {
    let tarjeta="";
    if(type === 'vi'){
      tarjeta='Visa';
    }else if (type === 'mc'){
      tarjeta='Mastercard';
    }else if (type === 'ax'){
      tarjeta='American Express';
    }else if (type === 'di'){
      tarjeta='Diners';
    }else if (type === 'dc'){
      tarjeta='Discover';
    }else if (type === 'ms'){
      tarjeta='Maestro';
    }else if (type === 'cs'){
      tarjeta='Credisensa';
    }else if (type === 'so'){
      tarjeta='Solidario';
    }else if (type === 'up'){
      tarjeta='Union Pay';
    }
    tarjeta= tarjeta+" ****"+number;
    this.storage.set('nombreTarjeta', name); 
    this.storage.set('numeroTarjeta', tarjeta); 
    this.storage.set('tokenTarjeta', token);
    const aValidar = {
      id: this.id,
      numVal: 0,
      token: token
    }
    this.tarjetaService.checkEstaVal(aValidar).subscribe(
      async (data) => {
        console.log(data)
        console.log(data['valid'])
        if(data['valid']== "OK"){
          this.router.navigate(['/footer/efectivo']);
        }else{
          this.mensajeIncorrecto("Esta tarjeta NO esta validada", "Validela antes de seguir.")
          this.router.navigate(['/footer/info-tarjeta']);
        }
      }
    )
  }

  async datos() {
    await this.showLoading2();
    this.tarjetaService.getTarjetas(this.id)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          console.log(this.id);
          this.numTarjetas= data["cards"].length;
          this.tarjetas = data["cards"];

        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }

  async mensajeIncorrecto(titulo: string, mensaje: string) {
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
    this.loading = await this.loadingCtrl.create({
      message: 'Loading.....'
    });
    await this.loading.present();

  }

  dismiss() {
    this.modalController.dismiss();
  }

  atras(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.navCtrlr.back(animations)
  }

  async agregar() {
    let modal = await this.modalController.create({
      component: NuevaTarjetaPage,
      cssClass: 'modal-tarjeta'
    });
    modal.onDidDismiss().then((data) => {
      this.datos();
    });
    return await modal.present();
  }

  async agregarNegado() {
    this.mensajeIncorrecto("Atención", "En nuestra aplicación, solo podrás registrar hasta 2 tarjetas. Para más información comunicarse con administración.")
  }
}