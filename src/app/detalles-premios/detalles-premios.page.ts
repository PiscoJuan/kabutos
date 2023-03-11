import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PremiosService } from '../servicios/premios.service';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { CorrectoPage } from '../aviso/correcto/correcto.page';

@Component({
  selector: 'app-detalles-premios',
  templateUrl: './detalles-premios.page.html',
  styleUrls: ['./detalles-premios.page.scss'],
})
export class DetallesPremiosPage implements OnInit {
  imagen = ""
  nombre = ""
  descripcion = ""
  precio = ""
  button = false
  constructor(
    public navCtrol: NavController,
    public navParams: NavParams,
    private premiosService: PremiosService,
    private router: Router,
    public modalCtrl: ModalController,
    private alert: AlertController,
    private storage: Storage,
    public modalController: ModalController,
    private loading: LoadingController) { }

  ngOnInit() {
    this.imagen = this.navParams.get('imagen')
    this.nombre = this.navParams.get('nombre')
    this.descripcion = this.navParams.get('descripcion')
    this.precio = this.navParams.get('precio')
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  reclamo() {
    this.storage.get("perfil").then((dato) => {
      let info = { "id": Number(dato.id), "premio": this.nombre }
      this.premiosService.reclamarPremio(info).subscribe(data => {
        console.log(data.valid)
        if (data.valid == "OK") {
          this.mensajeCorrecto('Premio Canjeado', 'Acérquese a Cabuto`s para poder reclamar su premio')
          this.router.navigateByUrl('/footer/premios', { replaceUrl: true });
          this.modalCtrl.dismiss();
        } else if (data.valid == "cantidad") {
          this.mensajeIncorrecto('Canje Inválido', 'Se han reclamado todas las instancias del premio')
          this.modalCtrl.dismiss();
        } else if (data.valid == "existe") {
          this.mensajeIncorrecto('Premio no reclamado', 'Reclama tu premio para poder canjearlo de nuevo')
          this.modalCtrl.dismiss();
        } else if (data.valid == "puntos") {
          this.mensajeIncorrecto('Canje Inválido', 'Te faltan puntos para reclamar este premio')
          this.modalCtrl.dismiss();
        } else {
          this.mensajeIncorrecto('Error', 'Sucedió un error inesperado, intente de nuevo')
          this.modalCtrl.dismiss();
        }
      })
    })
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
}

