import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { NuevaDireccionPage } from './nueva-direccion/nueva-direccion.page';
import { ConfirmarDireccionPage } from './confirmar-direccion/confirmar-direccion.page';
import { Storage } from '@ionic/storage';
import { DireccionEntregaService } from '../servicios/direccion-entrega.service';
import { finalize } from 'rxjs/operators';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {
  loading:any;
  direcciones:any;
  constructor(public modalController: ModalController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public direccionService: DireccionEntregaService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('id').then((val)=>{
      if(val!=null){
        this.datos(val);
      }
    });
    
  }

  async datos(val) {
    await this.showLoading2();
    this.direccionService.getDirecciones(val)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          this.direcciones = data;
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }
  
  async agregar(){
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: NuevaDireccionPage,
      cssClass: 'modal-direccion' 
    });
    return await modal.present();
  }

  async confirmar(id){
    console.log(id);
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ConfirmarDireccionPage,
      componentProps: {id},
      cssClass: 'confirm-modal' 
    });
    return await modal.present();
  }

  dismiss(){
    this.modalController.dismiss();
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
}
