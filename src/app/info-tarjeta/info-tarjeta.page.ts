import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { NuevaTarjetaPage } from '../tarjeta/nueva-tarjeta/nueva-tarjeta.page';
import { TarjetaService } from '../servicios/tarjeta.service';
import { PerfilService } from '../servicios/perfil.service';
import { finalize } from 'rxjs/operators';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { CorrectoPage } from '../aviso/correcto/correcto.page';

@Component({
  selector: 'app-info-tarjeta',
  templateUrl: './info-tarjeta.page.html',
  styleUrls: ['./info-tarjeta.page.scss'],
})
export class InfoTarjetaPage implements OnInit {

  id;
  loading: any;
  tarjetas: any;
  constructor(
    private alertCtrl: AlertController,
    private storage: Storage,
    public modalController: ModalController,
    private perfiltarjeta:PerfilService,
    public tarjetaService: TarjetaService,
    private loadingCtrl: LoadingController,) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    //console.log("didEnter");
    this.storage.get('id').then((val) => {
      console.log(val);
      if (val != null) {
        this.id = val;
        this.datos();
      } else {
        this.id = null;
        this.mensajeIncorrecto("Inicie sesión", "Debe iniciar sesión para consultar sus tarjetas.")
      }
    });
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

  async presentConfirm(message: any,cancelText: any,okText: any): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        message: message,
        cssClass: 'alertClass',
        buttons: [
          {
            text: okText,
            handler: (ok) => {
              resolve('ok');
            }
          },
          {
            text: cancelText,
            handler: (cancel) => {
              resolve('cancel');
            }
          }
        ]
      });
      alert.present();
    });
  }

  async eliminar(token){
    this.presentConfirm('¿Desea eliminar esta tarjeta?','No','Si') .then(res => {
      if (res === 'ok') {
        this.borrar(token);
      }
    });
  }

  async borrar(token) {
    let datos = {
      "card": {
        "token": token
      },
      "user": {
        "id": this.id+""
      }
    }
    await this.showLoading2();
    this.tarjetaService.eliminarTarjeta(datos)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          if (data["message"] === "card deleted") {
            this.borarcredencial(token);
          }
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }

  borarcredencial(token){
    const info = {
      "token": token
    }
      
    this.perfiltarjeta.delCredencial(info)
      .subscribe(
        data => {
          if (data.valid == "OK") {
            this.mensajeCorrecto("Tarjeta eliminada", "Su tarjeta ha sido eliminada con éxito.")
            this.datos()
          }
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

  async mensajeCorrecto(titulo: string, mensaje: string) {
    const modal = await this.modalController.create({
      component: CorrectoPage,
      cssClass: 'CorrectoProducto',
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
          //console.log(data);
          this.tarjetas = data["cards"];
          if (Object.keys(this.tarjetas).length === 0) {
            this.mensajeIncorrecto("No tiene tarjetas", "No cuenta con tarjetas guardadas")
          }
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }
}
