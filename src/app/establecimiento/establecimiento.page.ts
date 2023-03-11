import { Component, OnInit, ViewChild } from '@angular/core';
import { EstablecimientoService } from '../servicios/establecimiento.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalMapaPage } from './modal-mapa/modal-mapa.page';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {IncorrectoPage} from '../aviso/incorrecto/incorrecto.page';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento.page.html',
  styleUrls: ['./establecimiento.page.scss'],
})
export class EstablecimientoPage implements OnInit {
  textInput: string = null;
  establecimientoInput: string = '';
  establecimientos: {};
  loading:any;
  
  constructor(
    public establecimientoService: EstablecimientoService,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.datos();
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
              this.establecimientos = data;
              if (Object.keys(this.establecimientos).length === 0) {
                this.mensajeIncorrecto("Establecimientos no encontrados", "No existen establecimientos para presentar")
              }
            },
            err => {
              this.mensajeIncorrecto("Algo Salio mal","Fallo en la conexión")
            }
        );
  }

  async buscar() {
    await this.showLoading2();
    this.buscarEstablecimiento()
        .pipe(
            finalize(async () => {
              await this.loading.dismiss();
            })
        )
        .subscribe(
            data => {
              this.establecimientos = data;
              if (Object.keys(this.establecimientos).length === 0) {
                this.mensajeIncorrecto("Establecimiento No encontrado", "No se ha podido encontrar el establecimiento, intente de nuevo")
              }
            },
            err => {
              this.mensajeIncorrecto("Algo Salio mal","Fallo en la conexión")
            }
        );
  }

  buscarEstablecimiento(): Observable<object>  {
    if(this.textInput != null){
      this.establecimientoInput = this.textInput;
    }else{
      this.establecimientoInput = "";
    }
    return this.establecimientoService.getEstablecimientoBuscar(this.establecimientoInput);
  }

  async presentModal(latitud, longitud) {
    const modal = await this.modalController.create({
      component: ModalMapaPage,
      componentProps: { latitud, longitud }, 
      cssClass: 'select-modal' 
    });
    return await modal.present();
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

}
