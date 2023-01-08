import { Component, OnInit, ViewChild } from '@angular/core';
import { EstablecimientoService } from 'src/app/servicios/establecimiento.service';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import {IncorrectoPage} from 'src/app/aviso/incorrecto/incorrecto.page';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { CorrectoPage } from 'src/app/aviso/correcto/correcto.page';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
declare var google;

@Component({
  selector: 'app-info-local',
  templateUrl: './info-local.page.html',
  styleUrls: ['./info-local.page.scss'],
})
export class InfoLocalPage implements OnInit {
  total:number;
  loading:any;
  direccion;
  @ViewChild('mapaUbicacion', { static: true }) mapElement;
  map;

  constructor(
    public establecimientoService: EstablecimientoService,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    private navCtrlr: NavController, 
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('total').then((val) => {
      this.total=val;
    });
    this.storage.get('direccionEntrega').then((val) => {
      if (val != null) {
        this.datos(val);
      }

    });
  }

  async datos(val) {
    await this.showLoading2();
    this.establecimientoService.getEstablecimientoId(val)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          this.direccion=data[0]
          this.mapa()
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }
  mapa() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: this.direccion.latitud, lng: this.direccion.longitud},
      zoom: 15
    }); 
    
    this.addMarker(this.map)
  }

  addMarker(map:any){
    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter()
    });
    
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

  continuar(){
    this.mensajeCorrecto("¡Selección exitosa!", "Acérquese al local seleccionado para recoger su pedido")
    this.router.navigate(['/footer/pago']);
  }

  atras(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.navCtrlr.back(animations)
  }

}
