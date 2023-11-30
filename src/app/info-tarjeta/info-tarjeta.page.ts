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
import { ConfirmacionPage } from '../tarjeta/confirmacion/confirmacion.page';

@Component({
  selector: 'app-info-tarjeta',
  templateUrl: './info-tarjeta.page.html',
  styleUrls: ['./info-tarjeta.page.scss'],
})
export class InfoTarjetaPage implements OnInit {

  id;
  loading: any;
  tarjetas: any;
  numTarjetas:any;
  tarjetaVal;
  numval=0;
  imgAdd:any = "../assets/img/agregar_2.png";
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
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.imgAdd= "../assets/img/agregar_2black.png"
      }
    });
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
    const aValidar = {
      id: this.id,
    }
    this.tarjetaService.checkFaltaVal(aValidar).subscribe(
      async (data) => {
        console.log(data)
        console.log(data['valid'])
        if(data['valid']== "OK"){
          let modal = await this.modalController.create({
            component: NuevaTarjetaPage,
            cssClass: 'modal-tarjeta'
          });
          modal.onDidDismiss().then((data) => {
            this.datos();
          });
          return await modal.present();
        }else{
          this.mensajeIncorrecto("Atención", "Valide sus otras tarjetas antes de agregar más.")
        }
      }
    )
  }

  async agregarNegado() {
    this.mensajeIncorrecto("Atención", "En nuestra aplicación, solo podrás registrar hasta 2 tarjetas. Para más información comunicarse con administración.")
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

      .subscribe(
        async data => {
          console.log(data);
          console.log(data["cards"].length);
          this.tarjetas = data["cards"];
          this.numTarjetas= data["cards"].length;
          if (Object.keys(this.tarjetas).length === 0) {
            this.mensajeIncorrecto("No tiene tarjetas", "No cuenta con tarjetas guardadas")
          }
          var c = 0
          for (var tarjeta of this.tarjetas){
            
            const aValidar = {
              token: tarjeta.token
            }
            await this.tarjetaService.checkEstaVal(aValidar)
            .pipe(
              finalize(async () => {
                await this.loading.dismiss();
              })
            )
            .subscribe(
              async (data) => {
                console.log("data")
                console.log(data)
                console.log(data['valid'])
                if(data['valid']== "OK"){
                  tarjeta.color='green'
                }else{
                  tarjeta.color='red'
                }
              }
            )
            c=c+1
          }
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }
  async validar(token){
    const aValidar = {
      id: this.id,
      numVal: this.numval,
      token: token
    }
    this.storage.set("token",token)
    this.tarjetaService.checkEstaVal(aValidar).subscribe(
      async (data) => {
        console.log(data)
        console.log(data['valid'])
        if(data['valid']== "OK"){
          return new Promise(async (resolve) => {
            const alert = await this.alertCtrl.create({
              message: 'Esta tarjeta ya esta validada.',
              cssClass: 'alertClass',
              buttons: [
                {
                  text: "Ok",
                  handler: (ok) => {
                    resolve('ok');
                  }
                },
              ]
            });
            alert.present();
          });
        }else{
          let modal = await this.modalController.create({
            component: ConfirmacionPage,
            cssClass: 'modal-tarjeta'
          });
          modal.onDidDismiss().then((data) => {
            this.datos();
          });
          return await modal.present();
        }
      }
    );
    
  }
}
