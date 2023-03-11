import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { interval } from 'rxjs';
import { MensajeriaService } from 'src/app/servicios/mensajeria.service';
import { IncorrectoPage } from '../../aviso/incorrecto/incorrecto.page';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  textSms = "";
  cliente: string
  admin: any;
  admin_seleccionado: string

  interval
  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    public modalController: ModalController,
    private mensajeriaService: MensajeriaService

  ) {

  }

  ngOnInit() {
    this.storage.get("perfil").then(data => {
      this.mensajeriaService.obtenerAdmin()
      this.cliente = data.cedula
      this.mensajeriaService.usuario_cliente = data.cedula
      this.mensajeriaService.obtenerListaMensajes()
      this.content.scrollToBottom(100)

      this.interval = setInterval(() => {
        this.mensajeriaService.obtenerListaMensajes()
      }, 2000);

      this.interval = setInterval(() => {
        this.content.scrollToBottom(100)
      }, 10000);
    } )
  }
  ionViewWillLeave() {
    clearInterval(this.interval);

  }

  ionViewDidEnter() {
    if (this.cliente) {
      this.mensajeriaService.obtenerAdmin()
      this.mensajeriaService.obtenerListaMensajes()
      this.admin_seleccionado = this.mensajeriaService.usuarios_admin[0].nombre + " " + this.mensajeriaService.usuarios_admin[0].apellido
      this.content.scrollToBottom(100)
    }else {
      this.mensajeIncorrecto("Perfil no encontrado","Inicie sesión para poder chatear con el administrador");
    }
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

  sendMessage() {
    if (this.textSms.length > 0) {
      console.log(this.storage.get("perfil").then(data => {
        data = {
          cliente: this.cliente,
          admin: this.admin,
          texto: this.textSms
        }
        console.log(data)
        this.mensajeriaService.sendMessage(data, this.content)

        this.textSms = "";
      }))

    }
  }

  regresar() {
    this.navCtrl.back()
  }

  manejarAdmin(event) {

    this.admin = event.detail.value.cedula
    this.mensajeriaService.usuario_admin = event.detail.value.cedula
    this.mensajeriaService.obtenerListaMensajes()
    this.mensajeriaService.marcar_leido()
    this.content.scrollToBottom(100)

  }

}
