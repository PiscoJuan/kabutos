import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../servicios/notificacion.service';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { finalize } from 'rxjs/operators';
import {DetalleNotificacionPage} from './detalle-notificacion/detalle-notificacion.page';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  notificaciones: any;
  loading: any;

  constructor(
    public notificacionService: NotificacionService,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
  ) {

  }

  ngOnInit() {
  }

  async get() {
    await this.showLoading2();
    this.notificacionService.getN()
      .then(
        response => {
          this.loading.dismiss();
          this.notificaciones = JSON.parse(response.data);
          this.parsearFechas();
          if (Object.keys(this.notificaciones).length === 0) {
            this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
          }
        },
        err => {
          this.loading.dismiss();
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }


  ionViewDidEnter() {
    this.get();
  }

  private parsearFechas() {

    this.notificaciones.forEach(a => {
      a.fecha = new Date(a.fecha);
    });
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

  async detalle(id,titulo:string,mensaje:string,imagen){
    const modal = await this.modalController.create({
      component: DetalleNotificacionPage,
      cssClass: 'DetalleNoti',
      componentProps: {
        'id':id,
        'titulo': titulo,
        'mensaje': mensaje,
        'imagen': imagen
      }
    });
    return await modal.present();
  }

}
