import { Component, OnInit } from '@angular/core';
import { PremiosService } from '../servicios/premios.service';
import { DetallesPremiosPage } from '../detalles-premios/detalles-premios.page';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { BaneoService } from '../servicios/baneo.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-premios-inicio',
  templateUrl: './premios-inicio.page.html',
  styleUrls: ['./premios-inicio.page.scss'],
})
export class PremiosInicioPage implements OnInit {
  premios: any;
  puntos: any;
  valorTarjeta: any;
  opcion: string = '0';
  nombre: string;
  public filtro: String = "vendidos";
  constructor(
    private premiosService: PremiosService,
    private storage: Storage,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    private router: Router,
    private baneoService: BaneoService,
  ) {}

  ngOnInit(): void {
    
  }

  ionViewWillEnter() {
    this.data()
  }

  data(){
    this.storage.get("perfil").then((dato) => {
      this.nombre = dato.nombre;
      this.premiosService.getPuntos(dato.id).subscribe((data:any) => {
        this.puntos = data.puntos
        this.valorTarjeta = data.puntos * (data.tarjetaAPuntos / data.puntosATarjeta)
        this.valorTarjeta = this.valorTarjeta.toFixed(2)
      })

      this.premiosService.getPremiosPersonales(dato.id).subscribe(data => {
        this.premios = data;
        console.log("fer", this.premios)
        let d = JSON.parse(JSON.stringify(this.premios));

        d = d.map(function(a){
          let f = a.fecha_canje.split('-')
          let fecha = new Date(f[0], f[1], f[2])
          a.fecha_canje = fecha
          return a
          })
        this.premios = d
        console.log("dat", this.premios)
      })
    });
  }

  async detalle(imagen: string, nombre: string, descripcion: string, precio: string) {
    this.storage.get("perfil").then((dato) => {
      this.baneoService.revisarBan(dato.id).subscribe(async (data:any) => {
        if (data.valid == "OK"){
          
            const modal = await this.modalCtrl.create({
              component: DetallesPremiosPage,
              cssClass: 'DetallesPremios',
              componentProps: {
                'imagen': imagen,
                'nombre': nombre,
                'descripcion': descripcion,
                'precio': precio,
              }
            });
            return await modal.present();
          
          
        } else {
          this.mensajeIncorrecto("Canje porhibido", "No puedes canjear premios");
        }
      })
    })
    
  }
  async mensajeIncorrecto(titulo:string,mensaje:string){
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

  showLoading3() {
    this.loadingCtrl.create({
      message: 'Loading.....'
    }).then((loading) => {
      loading.present(); {
        this.capturar();
      }
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    });
  }

  capturar() {
    let data = JSON.parse(JSON.stringify(this.premios));
    console.log(this.opcion)
    console.log(data)
    if (this.opcion.localeCompare("descendente") == 0) {
      this.filtro = "descendente";
      this.premios = data.sort(
        function(a,b){
          a = a.nombre.toLowerCase();
          b = b.nombre.toLowerCase();
          return a > b ? -1 : a < b ? 1 : 0;
        })
    }
    else if (this.opcion.localeCompare("ascendente") == 0) {
      this.filtro = "ascendente";
      this.premios = data.sort(
        function(a,b){
          a = a.nombre.toLowerCase();
          b = b.nombre.toLowerCase();
          return a < b ? -1 : a > b ? 1 : 0;
        })
    }
    else if (this.opcion.localeCompare("menor") == 0) {
      this.filtro = "menor";
      this.premios = data.sort(function(a,b){return a.puntos - b.puntos})
    }
    else if (this.opcion.localeCompare("mayor") == 0) {
      this.filtro = "mayor";
      this.premios = data.sort(function(a,b){return b.puntos - a.puntos})

    }
    else if (this.opcion.localeCompare("vendidos") == 0) {
      this.filtro = "vendidos";
    }
  }

  monto() {
    this.router.navigate(["/footer/hacer-regalo-puntos"]);
  }
  catalogo() {
    this.router.navigate(["/footer/catalogo"]);
  }
}
