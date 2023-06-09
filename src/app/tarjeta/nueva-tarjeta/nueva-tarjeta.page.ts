import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import {paymentez} from 'src/environments/environment.prod';
import { IncorrectoPage } from 'src/app/aviso/incorrecto/incorrecto.page';
import { TarjetaService } from 'src/app/servicios/tarjeta.service';
import { Storage } from '@ionic/storage';
import { CorrectoPage } from 'src/app/aviso/correcto/correcto.page';
import { PerfilService } from 'src/app/servicios/perfil.service';
import { Router } from '@angular/router'
import { finalize } from 'rxjs/operators';

declare var Payment: any;
declare var PaymentForm: any;
@Component({
  selector: 'app-nueva-tarjeta',
  templateUrl: './nueva-tarjeta.page.html',
  styleUrls: ['./nueva-tarjeta.page.scss'],
})
export class NuevaTarjetaPage implements OnInit {

  minimo; maximo;
  loading: any;
  nombre; apellido;
  card;
  id;
  responseNumTarj: any;
  butAtras:any = "../assets/img/atras_naranja.png";
  imgAdd:any = "../assets/img/agregar_2.png";
  colorBack:any = "var(--ion-color-naranja-oscuro)";
  @ViewChild('myCard', { static: true }) cardForm;

  constructor(
    public modalController: ModalController,
    public tarjetaService: TarjetaService,
    private loadingCtrl: LoadingController,
    public storage: Storage,
    public router: Router,
    public perfiltarjeta: PerfilService
  ) {
    Payment.init('stg', paymentez.app_code_client,paymentez.app_key_client);
    //Payment.init('prod', paymentez.app_code_client,paymentez.app_key_client);
    setTimeout(() => {
      this.card = new PaymentForm(this.cardForm.nativeElement);
    }, 400);

    this.minimo = new Date().toISOString();
    this.maximo = new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString();
    this.storage.get('name').then((val) => {
      if (val != null) {
        this.nombre = val;
      }
    });
    this.storage.get('apellido').then((val) => {
      if (val != null) {
        this.apellido = val;
      }
    });
  }

  ngOnInit() {
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.colorBack="#000000"
        this.imgAdd= "../assets/img/agregar_2black.png"
        this.butAtras= "../assets/img/atras_negro.png"
      }
    });
    this.storage.get('id').then((val) => {
      if (val != null) {
        this.id = val;
      }
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  save(form) {
    this.tarjetaService.getMes(this.id)
      .pipe(
        finalize(async () => {
          
        })
      )
      .subscribe(
        data => {
          console.log("La funcion es esta")
          this.responseNumTarj= data["estado"]
          if(this.responseNumTarj == "OK"){
            let checkCard = this.card.getCard()
            if (checkCard != null) {
              this.storage.get('id').then((id) => {
                if (id != null) {
                  this.storage.get('correo').then((val) => {
                    if (val != null) {
                      var $this = this;
                      let button = <HTMLButtonElement> document.getElementById('guardarTarjeta');
                      let texto=button.innerText
                      button.disabled = true;
                      button.innerText = "Procesando...";
                      let successHandler = function (cardResponse) {
                        console.log("successHandler");
                        if (cardResponse.card.status === 'valid') {
                          console.log("validddddd")
                          const info = {
                            "token": cardResponse.card.token,
                            "cvc": checkCard.card.cvc
                          }
                          console.log("aca llega creo")

                          $this.perfiltarjeta.addCredencial(info)
                          .subscribe(
                            data => {
                              console.log(data);
                              if(data.valid=="OK"){
                                $this.mensajeCorrecto("Tarjeta agregada","Su tarjeta ha sido añadida con éxito");
                              }else{
                              $this.mensajeIncorrecto("Tarjeta no agregada","Intente ingresar nuevamente sus datos");
                              $this.router.navigate(['']);
                              }
                            },
                            err => {
                              $this.mensajeIncorrecto("Tarjeta no agregada","Intente ingresar nuevamente sus datos");
                              $this.router.navigate(['']);
                            }
                          );

                        } else if (cardResponse.card.status === 'review') {
                          console.log("osssvalidddddd")
                          $this.mensajeCorrecto("Tarjeta en revisión","Su tarjeta será revisada");
                        } else {
                          console.log("INvalidddddd")
                          $this.mensajeIncorrecto("Tarjeta no agregada","Intente ingresar nuevamente sus datos");
                        }
                        $this.dismiss();
                      };
                      let errorHandler = function (err) {
                        $this.mensajeIncorrecto("Tarjeta no agregada","Intente ingresar nuevamente sus datos")
                        button.disabled = false;
                        button.innerText = texto;
                      };

                      Payment.addCard(id+"", val, checkCard, successHandler, errorHandler);

                      }
                  });
                }
              });
            }
          }else{
            this.mensajeIncorrecto("Demasiadas Tarjetas registradas", "Por cuestiones de seguridad, no permitimos ingresar más de 2 tarjetas. Para más información comunicarse con administración.")
          }
          
        },
        err => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        }
      );
  }

  enviar() {
  }

  async confirmar(id) {
    console.log(id);
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
