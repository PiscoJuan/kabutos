import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CorrectoPage } from '../aviso/correcto/correcto.page';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { HistorialService } from '../servicios/historial.service';

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.page.html',
  styleUrls: ['./calificar.page.scss'],
})
export class CalificarPage implements OnInit {

  @Input() public pedido: number;
  condition: number = 0;
  justificacion = "";
  list: any[] = new Array(5);
  loading:any
  constructor(
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    public pedidoService: HistorialService
    ) { 

    }

  async ngOnInit() {
    this.pedidoService.getCalificacion(this.pedido)
      .subscribe(
        data => {
          console.log(data);  
          this.justificacion=data[0].justificacion
          this.condition=data[0].calificacion        
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );    
  }

  ionViewWillEnter(){
    
  }

  review(i) {
    this.condition = i + 1;
    console.log(this.condition)
 }

 enviar(){
   if(this.condition == 0){
    this.mensajeIncorrecto("Campos incompletos", "La calificación debe ser mayor a 0")
   }else{
    this.calificar()
   }
 }
  async calificar() {
    await this.showLoading2();
    let info = {
      "pedido": this.pedido,
      "calificacion": this.condition,
      "justificacion": this.justificacion
    }
    console.log(info);
    this.pedidoService.calificarPedido(info)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          console.log(data);          
          this.mensajeCorrecto("Calificación guardada", "Su calificación ha sido enviada con exito");
          this.dismiss()
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );

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

}
