import { Component, Input, OnInit } from "@angular/core";
import { PerfilService } from "../servicios/perfil.service";

import { AnimationOptions } from "@ionic/angular/providers/nav-controller";
import { LoadingController } from "@ionic/angular";
import { IncorrectoPage } from "../aviso/incorrecto/incorrecto.page";
import { CorrectoPage } from "../aviso/correcto/correcto.page";
import { NavController, ModalController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { HacerRegaloService } from "../servicios/hacer-regalo.service";
import {HistorialService} from '../servicios/historial.service';
import { PremiosService } from '../servicios/premios.service';
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-hacer-regalo-puntos",
  templateUrl: "./hacer-regalo-puntos.page.html",
  styleUrls: ["./hacer-regalo-puntos.page.scss"],
})
export class HacerRegaloPuntosPage implements OnInit {
  perfil: any;
  loading: any;
  monto: any;
  puntos: any;
  tarjetaAPuntos;
  puntosATarjeta;
  input:any;
  correo: any;
  usuarios: any;
  puntosactuales: any;
  valorTarjeta: any;
  public id: any;
  public idCarrito: any;
  datalist:any;

  constructor(
    private premiosService: PremiosService,
    private storage: Storage,
    public perfilService: PerfilService,
    private HistorialService: HistorialService,
    private navCtrlr: NavController,
    public hacerRegaloService: HacerRegaloService,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    private router: Router
  ) {
    this.storage.get("perfil").then((val) => {
      if (val != null) {
        this.perfil = val;
      }
    });
  }

  ngOnInit() {
    this.cargaPantalla();
    this.perfilService.getPerfiles().subscribe((data) => {
      this.usuarios=(data)
    });
    this.input = document.querySelector("correo") as HTMLInputElement | null // Selects the input.
    this.datalist = document.getElementById("brow")as HTMLDataListElement | null; // Selects the datalist.
    this.datalist.setAttribute("id", "");
  }

  cargaPantalla() {
    this.loadingCtrl.create({
      message: 'Loading.....'
    }).then((loading) => {
      loading.present(); {
        
        this.ionViewWillEnter();
      }
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    });
  }

  ionViewWillEnter() {
    this.data()
    console.log("id")
    this.storage.get("id").then((val) => {
        this.id = Number(val);
        console.log(val)
    });
    console.log("id_carrito")
    this.storage.get("id_carrito").then((val) => {
        this.idCarrito = Number(val);
        console.log(val)
    });
    let datsCLiente = {
      id: this.id ,
      carrito: this.idCarrito,
    };
  }

  atras() {
    let animations: AnimationOptions = {
      animated: true,
      animationDirection: "back",
    };
    this.navCtrlr.back(animations);
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

  lista(e){
    // If input value is longer or equal than 2 chars, adding "users" on ID attribute.
   if (e.target.value.length >= 3) {
     this.datalist.setAttribute("id", "brow");
   } else {
     this.datalist.setAttribute("id", "");
   }
 }

 data(){
  this.storage.get("perfil").then((dato) => {
    this.premiosService.getPuntos(dato.id).subscribe((data:any) => {
      this.puntos = data.puntos
      this.puntosactuales=data.puntos
      this.valorTarjeta = data.puntos * (data.tarjetaAPuntos / data.puntosATarjeta)
      this.tarjetaAPuntos
      this.puntosATarjeta
      this.valorTarjeta = this.valorTarjeta.toFixed(2)
      console.log(data)
    })
  });
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    var a:any = document.getElementById("monto")
    var b:number = +a.value
    this.puntosactuales=this.puntos - b
    return true;
  }

  yep(event:Input) {
    this.storage.get("perfil").then((dato) => {
      this.premiosService.getPuntos(dato.id).subscribe((data:any) => {
        var a:any = document.getElementById("monto")
        var b:number = +a.value 
        var c:number = b * (data.puntosATarjeta / data.tarjetaAPuntos)
        this.puntosactuales=Math.floor(this.puntos - c)
      })
    });
  }

  canjear(form) {
    if (this.puntosactuales <= 0 || !this.puntosactuales) {
      this.mensajeIncorrecto(
        "Cantidad Invalida",
        "Ingrese una cantidad que no haga que se quede sin puntos."
      );
    } else if (form.value.monto <= 0 || !form.value.monto){
      this.mensajeIncorrecto(
        "Cantidad Invalida",
        "Ingrese una cantidad mayor a 0usd."
      );
    } else if (!form.value.correo){
      this.mensajeIncorrecto(
        "Ingrese un correo",
        "Ingrese el correo de otro usuario."
      );
    }else {
      let Data = { correo: form.value.correo, id_cliente: this.perfil.id };
      this.hacerRegaloService.getClienteCorreo(Data).subscribe((data) => {
        console.log("id del recpetor"+data.id);
        if (data.valid == "NO") {
          this.mensajeIncorrecto(
            "Correo Incorrecto",
            "No se encuentran ususarios con el correo que acaba de escribir."
          );
        } else if (data.valid == "OK") {
          form.descripcion="Esta tarjeta de regalo se puede utilizar para descontar el monto fijado en su próxima compra.";
          let Data2 = { id_cliente:this.perfil.id, receptor:form.value.correo, total:form.value.monto,descripcion:"Esta tarjeta de regalo se puede utilizar para descontar el monto fijado en su próxima compra."};
          console.log(Data2)
          this.HistorialService
            .crearTarjetaRegaloMonto(Data2)
            .pipe(
              finalize(async () => {
                await this.loading.dismiss();
              })
            )
            .subscribe(
              (data) => {
                if (data.valid == "OK") {
                  let info = {"id": this.perfil.id , "puntos": this.puntosactuales}
                  this.premiosService.restarPuntos(info).subscribe(data => {
                    if (data.valid == "OK") {
                      this.mensajeCorrecto("Su regalo se ha enviado", "");
                      this.router.navigate([""]);
                    } else {
                      this.mensajeIncorrecto("Error", "No se creo la tarjeta");
                      this.router.navigate([""]);
                    }
                  })
                } else {
                  this.mensajeIncorrecto("Error", "No se creo la tarjeta");
                  this.router.navigate([""]);
                }
              },
              (err) => {
                this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión");
              }
            );
        } else if (data.valid == "talvez") {
          this.mensajeIncorrecto(
            "Código ya canjeado",
            "Ya has canjeado este código anteriormente"
          );
        }
      });
    }
  }
}
