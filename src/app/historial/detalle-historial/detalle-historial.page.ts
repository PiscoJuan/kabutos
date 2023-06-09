import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras,ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController, AlertController } from '@ionic/angular';
import { IncorrectoPage } from '../../aviso/incorrecto/incorrecto.page';
import { finalize } from 'rxjs/operators';
import { HistorialService } from 'src/app/servicios/historial.service';
import { Storage } from '@ionic/storage';
import { PerfilService } from 'src/app/servicios/perfil.service';
import { TarjetaService } from 'src/app/servicios/tarjeta.service';
import { CorrectoPage } from 'src/app/aviso/correcto/correcto.page';
import {CalificarPage} from 'src/app/calificar/calificar.page'

@Component({
  selector: 'app-detalle-historial',
  templateUrl: './detalle-historial.page.html',
  styleUrls: ['./detalle-historial.page.scss'],
})
export class DetalleHistorialPage implements OnInit {
  id:any;
  historial:any;
  loading:any;
  productos: any;
  ofertas: any;
  combos: any;
  cupones: any;
  perfil:any;
  transaction:any;
  usuario_id;
  image:any ="../assets/img/atras.png"
  colorBack:any = "var(--ion-color-naranja-oscuro)";
  constructor(
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    private storage: Storage,
    private route: ActivatedRoute, private router: Router,
    public historialService: HistorialService,
    private perfilService: PerfilService,
    private tarjetaService: TarjetaService
  
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.id;
      }
    });
  }

  ngOnInit() {
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.colorBack="#000000"
        this.image= "../assets/img/atrasblack.png"
      }
    });
  }

  ionViewDidEnter(){
    this.buscar(this.id);
    this.storage.get('id').then((val) => {
      if (val != null) {
        this.usuario_id = val;
      }
    });
    this.storage.get('perfil').then((value)=>{
      console.log(value);
      if(value==null){
        this.storage.get('correo').then((val) => {
          if (val != null) {
            this.perfilService.getPerfil(val).subscribe(
              data => {
                this.perfil = data[0];
                console.log(data);
                if (this.perfil.telefono == "NONE") {
                  this.perfil.telefono = "";
                }
                if (this.perfil.direccion == "NONE") {
                  this.perfil.direccion = "";
                }      
                if (Object.keys(this.perfil).length === 0) {
                  this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
                }else{
                  this.storage.set('perfil',this.perfil);
                }

              },
              err => {
                this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
              }
            );
          } 
          
        });
      }else{
        this.perfil=value;
      }
    });
  }

  async buscar(id) {
    await this.showLoading2();
    this.historialService.getPedido(id)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          console.log(data);
          this.historial = data["pedido"][0];
          this.productos = data["productos"]
          this.ofertas = data["ofertas"]
          this.combos = data["combos"]
          this.cupones = data["cupones"]
          if(!this.historial.pagado && this.historial.tipo_pago == "Tarjeta"){
            this.storage.get('tokenTarjeta').then((val) => {
              this.historial.token = val + "";
            });
          }
          if(this.historial.pagado && this.historial.tipo_pago == "Tarjeta"){
            this.transaction = data["transaccion"][0]
            console.log(this.transaction.transaccion)
          }
          if (Object.keys(this.historial).length === 0) {
            this.mensajeIncorrecto("Historial vacío", "No ha realizado pedidos")
          }
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }

  async cancelar(id_pedido, id) {
    await this.showLoading2();
    const info = {
      'id': id,
      'pedido': id_pedido
    }
    this.historialService.cancelarPedido(info)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          console.log(data);
          if (data.valid == "ok") {
            if(this.historial.pagado && this.historial.tipo_pago == "Tarjeta"){
              this.refund()
            }
            this.regresar()
          }else{
            this.mensajeIncorrecto("Pedido no puede cancelarse", "Su pedido ha sido enviado")
          }
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }

  async anular(id_pedido,id){
    this.presentConfirm('¿Desea anular esta compra?','No','Si') .then(res => {
      if (res === 'ok') {
        this.cancelar(id_pedido,id);
      }
    });
  }

  async presentConfirm(message: any,cancelText: any,okText: any): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        message: message,
        cssClass: 'alertClass',
        buttons: [
          {
            text: okText,
            handler: (ok) => {
              resolve('ok');
            }
          },
          {
            text: cancelText,
            handler: (cancel) => {
              resolve('cancel');
            }
          }
        ]
      });
      alert.present();
    });
  }

  async refund(){
    await this.showLoading2();
    let info = {
      "transaction": {
        "id": this.transaction.transaccion
      }
    }
    console.log(info);
    this.tarjetaService.devolver(info)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }

  async pagar(id){
    console.log("info que se manda al pagar o algo asi la verdad no se Dx");
    await this.showLoading2();
    let info = {
      "card": {
        "token": this.historial.token
      },
      "user": {
        "id": this.usuario_id + "",
        "email": this.perfil.correo
      },
      "order": {
        "amount": this.historial.total,
        "description": "Approved transaction",
        "dev_reference": this.historial.id_pedido + "",
        "vat": Number(this.historial.iva.toFixed(2)) 
      },
      "extra_params": {
        "threeDS2_data": {
          "term_url" : "https://cabutoshop.pythonanywhere.com/movil/threeds/",
          "device_type": "browser",
          "process_anyway": false
        }
      }
    }
    console.log(info);
    this.tarjetaService.pagar(info)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          console.log(data);
          if(data.transaction.status=="success"){
            this.pagado(this.historial.id_pedido,data.transaction.id)
          }
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }

  async pagado(id_pedido,transaccion) {
    await this.showLoading2();
    let info = {
      "pedido": id_pedido,
      "transaccion": transaccion
    }
    console.log(info);
    this.historialService.pagarPedido(info)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        data => {
          console.log(data);          
          this.mensajeCorrecto("Pago exitoso", "Su pedido ha sido pagado con exito");
          this.regresar();
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );

  }

  async calificar(id){
    const modal = await this.modalController.create({
      component: CalificarPage,
      cssClass: 'confirm-modal',
      componentProps: {
        'pedido': id
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

  regresar(){
    this.router.navigate(['/footer/historial']);
  }

}
