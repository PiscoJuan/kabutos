import { Component, OnInit } from '@angular/core';
import { TarjetaService } from 'src/app/servicios/tarjeta.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router'
import { PerfilService } from 'src/app/servicios/perfil.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { IncorrectoPage } from '../../aviso/incorrecto/incorrecto.page';
import { CorrectoPage } from '../../aviso/correcto/correcto.page';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {
  token;
  constructor(
    public modalController: ModalController,
    public tarjetaService: TarjetaService,
    private loadingCtrl: LoadingController,
    public storage: Storage,
    public router: Router,
    public perfiltarjeta: PerfilService
  ) { }

  ngOnInit() {
  }

  async comprobar(){
    console.log("Entra en Comprobar")
    const numeroAcomprobar: any = document.getElementById('numeroComprobar')
    console.log(numeroAcomprobar.value)
    this.storage.get("token").then(
      (val) => {
    this.token = val
      }
    )
    console.log("this.token")
    console.log(this.token)
    this.storage.get('id').then(
      (val) => {
        console.log(val)
        const aValidar = {
          id: val,
          numVal: Number(numeroAcomprobar.value),
          token: this.token
        }
    
        this.tarjetaService.checkNumValidacion(aValidar).subscribe(
          (data) => {
            console.log(data)
            console.log(data['valid'])
            if(data['valid']== "OK"){
              this.mensajeCorrecto("Tarjeta validada","Su tarjeta ha sido validada con éxito");
              this.modalController.dismiss();
            }else{
              this.mensajeIncorrecto("Número incorrecto", "Vuelva a intentar")
              this.modalController.dismiss();
            }
          }
        );
      }
    )
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
}
