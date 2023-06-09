import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  LoadingController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { finalize } from "rxjs/operators";
import { IncorrectoPage } from "../aviso/incorrecto/incorrecto.page";
import { DireccionEntregaService } from "../servicios/direccion-entrega.service";
import { PerfilService } from "../servicios/perfil.service";
import { Storage } from "@ionic/storage";
import { HistorialService } from "../servicios/historial.service";
import { CorrectoPage } from "../aviso/correcto/correcto.page";
import { TarjetaService } from "../servicios/tarjeta.service";
import { Observable } from "rxjs";
import { EstablecimientoService } from "../servicios/establecimiento.service";
import { AnimationOptions } from "@ionic/angular/providers/nav-controller";
import { TarjetaPage } from '../aviso/tarjeta/tarjeta.page';
import { TresDsPage } from '../tres-ds/tres-ds.page';


@Component({
  selector: "app-efectivo",
  templateUrl: "./efectivo.page.html",
  styleUrls: ["./efectivo.page.scss"],
})
export class EfectivoPage implements OnInit {
  total: number;
  perfil: any;
  direccion: any;
  tipoPago: any;
  pago: any;
  iva: any;
  loading: any;
  envio: any;
  mensaje: any;
  numero: any;
  id_direccion;
  token = "";
  id: any;
  cvc: any;
  receptor: any;
  nombreTarjeta: any="";
  numeroTarjeta: any="";
  tarjetaRegalo= "no";
  colorBack:any = "var(--ion-color-naranja-oscuro)";
  butAtras:any = "../assets/img/atras_naranja.png";
  constructor(
    private storage: Storage,
    public perfilService: PerfilService,
    public modalController: ModalController,
    public tarjetaService: TarjetaService,
    private router: Router,
    private direccionService: DireccionEntregaService,
    private localService: EstablecimientoService,
    private pedidoService: HistorialService,
    private loadingCtrl: LoadingController,
    private navCtrlr: NavController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.colorBack="#000000"
        this.butAtras= "../assets/img/atras_negro.png"
      }
    });
    this.envio = false;
    this.tarjetaRegalo='no        '
    //console.log("didEnter");
    this.storage.get("total").then((val) => {
      this.total = Number(val);
    });
    this.storage.get("perfil").then((value) => {
      //console.log(value);
      if (value == null) {
        this.storage.get("correo").then((val) => {
          if (val != null) {
            this.perfilService.getPerfil(val).subscribe(
              (data) => {
                this.perfil = data[0];
                console.log(data);
                if (this.perfil.telefono == "NONE") {
                  this.perfil.telefono = "";
                }
                if (this.perfil.direccion == "NONE") {
                  this.perfil.direccion = "";
                }
                if (Object.keys(this.perfil).length === 0) {
                  this.mensajeIncorrecto(
                    "Algo Salio mal",
                    "Fallo en la conexión"
                  );
                } else {
                  this.storage.set("perfil", this.perfil);
                }
              },
              (err) => {
                this.mensajeIncorrecto(
                  "Algo Salio mal",
                  "Fallo en la conexión"
                );
              }
            );
          }
        });
      } else {
        this.perfil = value;
      }
    });
    this.storage.get("tipoPago").then((val) => {
      if (val != null) {
        if (val == "Efectivo") {
          this.tipoPago = "Efectivo";
          this.numero = "";
        } else {
          this.tipoPago = "Tarjeta";
          this.storage.get("tokenTarjeta").then((val) => {
            this.token = val + "";
          });
          this.storage.get("numeroTarjeta").then((val) => {
            if (val != null) {
              this.numero = val;
            }
          });
          this.storage.get("numeroTarjeta").then((val) => {
            if (val != null) {
              this.numero = val;
            }
          });
        }
      }
    });
    this.storage.get("id").then((val) => {
      if (val != null) {
        this.id = val;
      }
    });
    this.storage.get("direccionEntrega").then((val) => {
      if (val != null) {
        console.log(val);
        this.storage.get("tipoEntrega").then((tipo) => {
          console.log(tipo);
          if (tipo != null) {
            this.id_direccion = val;
            if (tipo === "Local") {
              this.pago = this.total;
              this.recoger(val);
            } else {
              this.datos(val);
            }
          }
        });
      } else {
        this.pago = this.total;
      }
    });
    this.storage.get("tarjetaRegaloMonto").then((val) => {
      if (val != null && val=='si') {
        this.tarjetaRegalo='si'
      }
    });
    this.storage.get("tarjetaRegaloproducto").then((val) => {
      if (val != null && val=='si') {
        this.tarjetaRegalo='si'
      }
    });
    this.storage.get("correoTemp").then((val) => {
      if (val != null) {
        this.receptor = val;
      }
    });
  }

  //aqui pedimos el token
  async getcredenciales(cvc, form) {
    await this.showLoading2();
    let completo = this.total + this.envio;
    let sub = this.total / 1.12;
    this.iva = sub * 0.12;

    let tax = Number(sub.toFixed(2));
    let vat = Number(this.iva.toFixed(2));
    let tot = Number(completo.toFixed(2));
    this.storage.get("nombreTarjeta").then((val) => {
      this.nombreTarjeta = val ;
    });
    this.storage.get("numeroTarjeta").then((val) => {
      this.numeroTarjeta = val ;
    });
    let info = {
      card: {
        token: this.token,
        cvc: cvc,
      },
      user: {
        id: this.id + "",
        email: this.perfil.correo,
      },
      order: {
        amount: tot,
        description: "Pedido Cabuto",
        dev_reference: "Pedido de Compra mediante tajreta",
        vat: vat,
        tax_percentage: 12,
        taxable_amount: tax,
      },
      term_url : "https://cabutoshop.pythonanywhere.com/movil/threeds",
      device_type: "browser",
      browser_info: {
        ip: "88.196.25.166",
        language: "en-US",
        java_enabled: false,
        js_enabled: true,
        color_depth: 24,
        screen_height: 1200,
        screen_width: 1920,
        timezone_offset: 0,
        user_agent: "Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/70.0.3538.110 Safari\/537.36",
        accept_header: "text/html"
      },
      extra_params: {
        threeDS2_data: {
          term_url : "https://cabutoshop.pythonanywhere.com/movil/threeds",
          device_type: "browser",
          process_anyway: false
        },
        
      }
    };
    console.log("info que se manda al pagar o algo asi la verdad no se Dx");
    console.log(info)

    //ACA al parecer 
    this.tarjetaService
      .pagar(info)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        (data) => {
          console.log("Aca imprime el resultado de pagar:")
          console.log(data) 
          if (data.transaction.status == "success") {
            this.guardarPedido(
              form,
              data.transaction.id,
              data.transaction.authorization_code
            );
          } else if (data.transaction.status == "pending" && data.transaction.status_detail == 35){
            let threeDSMethodData = {
              threeDSServerTransID: '<TRANS ID>',
              threeDSMethodNotificationURL: '<URL>'
            }
            let formTwo = document.getElementById('threeDSMethodForm');
            (<HTMLInputElement>document.getElementById('threeDSMethodData')).value= data["3ds"].browser_response.hidden_iframe;
            //inputValue.value= base64url(data.3ds.browser_response.hidden_iframe);
            // form.action = '<threeDSMethodURL>';
            // form.target = 'threeDSMethodIframe'; // id of iframe
            // form.method = 'post';
            // form.submit();  
            setTimeout(() => {
              console.log("Delayed for 5 second.");
              let datos = {
                user: {
                  id: this.id + ""
                },
                transaction: {
                  id: data.transaction.id
                },
                type: "AUTHENTICATION_CONTINUE",
                value: ""
              };
              console.log("COSAS ASASAS: "+ datos)
              console.log(datos)
              this.tarjetaService.autentificar(datos)
              .subscribe(
                (respFinal) => {
                  console.log("Aca imprime el resultado de pagar:")
                  console.log(respFinal) 
                  if (respFinal.transaction.status_detail == 3 ){
                    this.guardarPedido(
                      form,
                      data.transaction.id,
                      data.transaction.authorization_code
                    );
                    console.log("Funciona!!!!!!!!")
                  } else if (data.transaction.status == "pending" && data.transaction.status_detail == 36){
                    let datos = {
                      user: {
                        id: this.id + ""
                      },
                      transaction: {
                        id: data.transaction.id
                      },
                      term_url : "https://cabutoshop.pythonanywhere.com/movil/threeds",
                      device_type: "browser",
                      type: "BY_CRES",
                      value: "U3VjY2VzcyBBdXRoZW50aWNhdGlvbg=="
                    };
                    console.log("COSAS ASASAS: "+ datos)
                    console.log(datos)
                    this.tarjetaService.autentificar(datos)
                    .subscribe(
                      (respFinal) => {
                        console.log("Aca imprime el resultado de pagar:")
                        console.log(respFinal) 
                        if (respFinal.status_detail == 3 ){
                          this.guardarPedido(
                            form,
                            data.transaction.id,
                            data.transaction.authorization_code
                          );
                        }else{
                          this.mensajeIncorrecto("Algo Salio mal", data.transaction.message);
                          this.router.navigate([""]);
                        }
                      }
                    )
                  }else{
                    this.mensajeIncorrecto("Algo Salio mal", data.transaction.message);
                    this.router.navigate([""]);
                  }
                }
              )
            }, 6000);
            

            

          } else if (data.transaction.status == "pending" && data.transaction.status_detail == 36){
            let datos = {
              user: {
                id: this.id + ""
              },
              transaction: {
                id: data.transaction.id
              },
              term_url : "https://cabutoshop.pythonanywhere.com/movil/threeds",
              device_type: "browser",
              type: "BY_CRES",
              value: "U3VjY2VzcyBBdXRoZW50aWNhdGlvbg=="
            };
            console.log("COSAS ASASAS: "+ datos)
            console.log(datos)
            this.tarjetaService.autentificar(datos)
            .subscribe(
              (respFinal) => {
                console.log("Aca imprime el resultado de pagar:")
                console.log(respFinal) 
                if (respFinal.status_detail == 3 ){
                  this.guardarPedido(
                    form,
                    data.transaction.id,
                    data.transaction.authorization_code
                  );
                }else{
                  this.mensajeIncorrecto("Algo Salio mal", data.transaction.message);
                  this.router.navigate([""]);
                }
              }
            )
          }
          else {
            this.mensajeIncorrecto("Algo Salio mal", data.transaction.message);
            this.router.navigate([""]);
          }
        },
        (err) => {
          this.mensajeIncorrecto(
            "Algo Salio mal",
            "Error con el Pago de su Tarjeta"
          );
          this.router.navigate([""]);
        }
      );
  }

  async agregar() {
    let modal = await this.modalController.create({
      component: TresDsPage,
      cssClass: 'modal-tarjeta'
    });
    modal.onDidDismiss().then((data) => {
      console.log("AAAAAAAAAAAAAAAAAAAAAAA")
    });
    return await modal.present();
  }

  async recoger(val) {
    await this.showLoading2();
    this.localService
      .getEstablecimientoId(val)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.direccion = data[0];
        },
        (err) => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión");
        }
      );
  }

  async datos(val) {
    await this.showLoading2();
    this.direccionService
      .getDireccion(val)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        (data) => {
          this.direccion = data[0];
          this.envio = this.direccion.envio;
          this.pago = this.total + this.envio;
        },
        (err) => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión");
        }
      );
  }
  async showLoading2() {
    this.loading = await this.loadingCtrl.create({
      message: "Loading.....",
    });
    await this.loading.present();
  }

  async mensajeIncorrecto(titulo: string, mensaje: string) {
    const modal = await this.modalController.create({
      component: IncorrectoPage,
      cssClass: "IncorrectoProducto",
      componentProps: {
        titulo: titulo,
        mensaje: mensaje,
      },
    });
    return await modal.present();
  }

  async mensajeCorrecto(titulo: string, mensaje: string) {
    const modal = await this.modalController.create({
      component: CorrectoPage,
      cssClass: "CorrectoProducto",
      componentProps: {
        titulo: titulo,
        mensaje: mensaje,
      },
    });
    return await modal.present();
  }
  async mensajeTarjeta(titulo: string, mensaje: string) {
    const modal = await this.modalController.create({
      component: TarjetaPage,
      cssClass: 'DetallesTarjeta',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje
      }
    });
    return await modal.present();
  }

  getText(item){
    this.mensaje=(item.value)
  }
  
  confirmar(form) {
    var form = form.value;
    form.tipoPago = this.tipoPago;
    form.subtotal = this.total;
    form.id = this.perfil.id;
    form.envio = this.envio;
    form.direccion = this.id_direccion;
    form.descuento = 0;
    form.mensaje= this.mensaje;
    form.tarj="no";
    this.storage.get("tarjetaRegaloMonto").then((val) => {
      if (val != null && val=='si') {
        form.receptor=this.receptor;
        form.descripcion="Esta tarjeta de regalo se puede utilizar para descontar el monto fijado en su próxima compra.";
        form.tarj="monto";
      }
    });
    this.storage.get("tarjetaRegaloproducto").then((val) => {
      if (val != null && val=='si') {
        form.receptor=this.receptor;
        form.descripcion="Esta tarjeta de regalo se puede utilizar para añadir algunos productos a tu carrito.";
        form.tarj="producto";
      }
    });
    this.storage.get('tipoEntrega').then((val) => {
      if (val != null) {
        form.tipoEntrega = val;
        if (val === "Local") {
          form.envio = 0;
        }
      }
    });
    this.storage.get("id_carrito").then((val) => {
      if (val != null) {
        form.carrito = val;
      }
    });

    if (this.tipoPago == "Tarjeta") {
      this.pagar(form);
    } else {
      this.guardarPedido(form, null, null);
    }
  }

  async pagar(form) {
    await this.showLoading2();
    this.perfilService
      .getCredencial(this.token)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        (data) => {
          this.getcredenciales(data, form);
        },
        (err) => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión");
        }
      );
  }

  
  async guardarPedido(form, transaccion, autorizacion) {
    await this.showLoading2();
    form.nombreTarjeta= this.nombreTarjeta,
    form.numeroTarjeta= this.numeroTarjeta
    this.pedidoService
      .nuevoPedido(form)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        (data) => {
          if (data.valid == "ok") {
            console.log("Envia notificacion: ", data.enviarnotificacion);
            if (this.tipoPago == "Tarjeta") {
              this.pagado(data.pedido, transaccion, autorizacion);
            }
            if (this.tipoPago == "Efectivo"){
              this.pagado(data.pedido, null, null)
            }
            this.storage.set("tarjetaRegaloMonto",'no')
            this.storage.set("tarjetaRegaloproducto",'no')
            this.storage.get("tipoEntrega").then((val) => {
              if (val != null) {
                if (this.tarjetaRegalo=='si') {
                  this.mensajeCorrecto("Su regalo se ha enviado", "");
                } else if (val === "Local" ){
                  this.mensajeCorrecto("Estaremos esperando por Usted", "");
                }else {
                  this.mensajeCorrecto("Su pedido será enviado en breve", "");
                }
              }
            });
            this.router.navigate([""]);
          } else {
            this.mensajeIncorrecto("Error", "No se ha enviado el pedido");
            this.router.navigate([""]);
          }
        },
        (err) => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión");
        }
      );
  }

  async guardarPedido2(form, transaccion, autorizacion) {
    await this.showLoading2();
    form.nombreTarjeta= this.nombreTarjeta,
    form.numeroTarjeta= this.numeroTarjeta
    this.pedidoService
      .nuevoPedido(form)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        (data) => {
          if (data.valid == "ok") {
            console.log("Envia notificacion: ", data.enviarnotificacion);
            if (this.tipoPago == "Tarjeta") {
              this.pagado(data.pedido, transaccion, autorizacion);
            }
            if (this.tipoPago == "Efectivo"){
              this.pagado(data.pedido, null, null)
            }
            this.storage.set("tarjetaRegaloMonto",'no')
            this.storage.set("tarjetaRegaloproducto",'no')
            this.storage.get("tipoEntrega").then((val) => {
              if (val != null) {
                if (this.tarjetaRegalo=='si') {
                  this.mensajeCorrecto("Su regalo se ha enviado", "");
                } else if (val === "Local" ){
                  this.mensajeCorrecto("Estaremos esperando por Usted", "");
                }else {
                  this.mensajeCorrecto("Su pedido será enviado en breve", "");
                }
              }
            });
          } else {
            this.mensajeIncorrecto("Error", "No se ha enviado el pedido");
          }
        },
        (err) => {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión");
        }
      );
  }

  async pagado(id_pedido, transaccion, autorizacion) {
    await this.showLoading2();
    let info = {
      pedido: id_pedido,
      transaccion: transaccion,
      autorizacion: autorizacion,
    };

    this.pedidoService
      .pagarPedido(info)
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(
        (data) => {
          if (transaccion != null || autorizacion != null){
            this.mensajeTarjeta("Aviso importante","Cabutos le informa, que para retirar su pedido, debe presentar su cédula de identidad y tarjeta utilizada en la compra")
          } 
          this.router.navigate([""]);
        },
        (err) => {
          if (transaccion != null || autorizacion != null){
            this.mensajeIncorrecto("Algo Salio mal", "Error con el Pago de su Tarjeta")
          }
          this.router.navigate([""]);
        }
      );
  }

  atras() {
    let animations: AnimationOptions = {
      animated: true,
      animationDirection: "back",
    };
    this.navCtrlr.back(animations);
  }
}
