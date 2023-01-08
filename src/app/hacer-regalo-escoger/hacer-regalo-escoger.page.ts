import { Component, OnInit } from "@angular/core";
import { PerfilService } from "../servicios/perfil.service";
import { HacerRegaloService } from "../servicios/hacer-regalo.service";
import { AnimationOptions } from "@ionic/angular/providers/nav-controller";
import { LoadingController } from "@ionic/angular";
import { IncorrectoPage } from "../aviso/incorrecto/incorrecto.page";
import { CorrectoPage } from "../aviso/correcto/correcto.page";
import { NavController, ModalController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";

@Component({
  selector: 'app-hacer-regalo-escoger',
  templateUrl: './hacer-regalo-escoger.page.html',
  styleUrls: ['./hacer-regalo-escoger.page.scss'],
})
export class HacerRegaloEscogerPage implements OnInit {
  perfil: any;
  loading: any;
  correo: any;
  receptor: any;

  constructor(private storage: Storage,
    public perfilService: PerfilService,
    public hacerRegaloService: HacerRegaloService,
    private navCtrlr: NavController,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    private router: Router) {
      this.storage.get("perfil").then((val) => {
      if (val != null) {
        this.perfil = val;
      }
    }); 
      this.storage.get("receptor").then((val) => {
        if (val != null) {
          this.receptor = val;
        }
    }); 
  }

  ngOnInit() {
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

  monto() {
    this.storage.set("tarjetaRegaloMonto",'si')
    this.storage.set("tarjetaRegaloproducto",'no')
    this.router.navigate(["/footer/hacer-regalo-monto"]);
  }
  producto() {
    this.storage.set("tarjetaRegaloMonto",'no')
    this.storage.set("tarjetaRegaloproducto",'si')
    this.router.navigate(["/footer/hacer-regalo-producto"]);
  }
}