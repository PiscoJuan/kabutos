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
  selector: "app-hacer-regalo",
  templateUrl: "./hacer-regalo.page.html",
  styleUrls: ["./hacer-regalo.page.scss"],
})
export class HacerRegaloPage implements OnInit {
  perfil: any;
  loading: any;
  correo: any;
  usuarios: any;
  input:any;
  datalist:any;
  colorBack:any = "var(--ion-color-naranja-oscuro)";
  butAtras:any = "../assets/img/atras_naranja.png";

  constructor(
    private storage: Storage,
    public perfilService: PerfilService,
    public hacerRegaloService: HacerRegaloService,
    private navCtrlr: NavController,
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
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.colorBack="#000000"
        this.butAtras= "../assets/img/atras_negro.png"
      }
    });
    this.perfilService.getPerfiles().subscribe((data) => {
      this.usuarios=(data)
    });
    this.input = document.querySelector("correo") as HTMLInputElement | null // Selects the input.
    this.datalist = document.getElementById("brow")as HTMLDataListElement | null; // Selects the datalist.
    this.datalist.setAttribute("id", "");
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

  canjear(form) {
    let Data = { correo: form.value.correo, id_cliente: this.perfil.id };
    this.hacerRegaloService.getClienteCorreo(Data).subscribe((data) => {
      console.log(Data);
      if (data.valid == "NO") {
        this.mensajeIncorrecto(
          "Correo Incorrecto",
          "No se encuentran ususarios con el correo que acaba de escribir."
        );
      } else if (data.valid == "OK") {
        this.storage.set("correoTemp",form.value.correo)

        this.storage.set("receptor",data.receptor)
        this.router.navigate(["/footer/hacer-regalo-escoger"]);
      } else if (data.valid == "talvez") {
        this.mensajeIncorrecto(
          "Código ya canjeado",
          "Ya has canjeado este código anteriormente"
        );
      }
    });
    //this.enviarForm(formData)
  }
  

  
  lista(e){
    
     // If input value is longer or equal than 2 chars, adding "users" on ID attribute.
    if (e.target.value.length >= 3) {
      this.datalist.setAttribute("id", "brow");
    } else {
      this.datalist.setAttribute("id", "");
    }
  }
}
