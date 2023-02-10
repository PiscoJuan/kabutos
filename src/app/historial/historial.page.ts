import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HistorialService } from '../servicios/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  historiales:any;
  loading: any;
  image:any = "../assets/img/carrito_naranja.png";

  constructor(
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private router: Router,
    public modalController: ModalController,
    public historialService: HistorialService,
  ) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.image= "../assets/img/carrito_negro.png"
      }
    });
    this.historiales = null;
    this.storage.get('id').then((val)=>{
      if(val!=null){
        this.buscar(val);
      }else{
        this.mensajeIncorrecto("Inicie sesión", "Debe iniciar sesión para revisar su historial de pedidos")
      }
    });
  }

  buscarHistorial(id): Observable<object> {
    
    return this.historialService.getHistorial(id);
  }
  async buscar(id) {
    await this.showLoading2();
    this.buscarHistorial(id)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          this.historiales = data;

          if (Object.keys(this.historiales).length === 0) {
            this.mensajeIncorrecto("Historial vacío", "No ha realizado pedidos")
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

  async showLoading2() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading.....'
    });
    await this.loading.present();
  }

  detalle(id){
    let navigationExtras: NavigationExtras = {
      state: {
        id: id,
      }
    };
    this.router.navigate(['/footer/historial/detalle-historial'], navigationExtras);
  }

}
