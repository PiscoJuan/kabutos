import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CorrectoPage } from 'src/app/aviso/correcto/correcto.page';
import { IncorrectoPage } from 'src/app/aviso/incorrecto/incorrecto.page';
import { DireccionEntregaService } from 'src/app/servicios/direccion-entrega.service';
import { Storage } from '@ionic/storage';
import { ModalMapaPage } from 'src/app/establecimiento/modal-mapa/modal-mapa.page';

@Component({
  selector: 'app-confirmar-direccion',
  templateUrl: './confirmar-direccion.page.html',
  styleUrls: ['./confirmar-direccion.page.scss'],
})
export class ConfirmarDireccionPage implements OnInit {
  
  @Input() public id: number;
  direccion:any;
  loading:any;
  colorBack:any = "var(--ion-color-naranja-oscuro)";
  butAtras:any = "../assets/img/atras_naranja.png";
  constructor(public modalController: ModalController,
    public direccionService:DireccionEntregaService,
    public loadingCtrl: LoadingController,    
    private router: Router,
    private storage: Storage) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.colorBack="#000000"
        this.butAtras= "../assets/img/atras_negro.png"
      }
    });
    console.log(this.id);
    this.datos(this.id);
    
  }

  async datos(val) {
    await this.showLoading2();
    this.direccionService.getDireccion(val)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          this.direccion = data[0];
          console.log(this.direccion)
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")        
          this.modalController.dismiss();
        }
      );
  }
  async showLoading2() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading.....'
    });
    await this.loading.present();

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

  confirmar(){
    this.modalController.dismiss();
    this.storage.set('direccionEntrega',this.id);
    this.mensajeCorrecto("¡Dirección de entrega confirmada!","")
    this.router.navigate(['/footer/pago']); 
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async verMapa(latitud, longitud) {
    const modal = await this.modalController.create({
      component: ModalMapaPage,
      componentProps: { latitud, longitud }, 
      cssClass: 'select-modal' 
    });
    return await modal.present();
  }

}
