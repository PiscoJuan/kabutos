import { Component, OnInit } from '@angular/core';
import { PremiosService } from '../servicios/premios.service';
import { DetallesPremiosPage } from '../detalles-premios/detalles-premios.page';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from "@angular/router";
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'app-premios-utilizados',
  templateUrl: './premios-utilizados.page.html',
  styleUrls: ['./premios-utilizados.page.scss'],
})
export class PremiosUtilizadosPage implements OnInit {
  puntos: any;
  valorTarjeta: any;
  misPremios: any;
  historial: any;
  colorBack:any = "var(--ion-color-naranja-oscuro)";
  butAtras:any = "../assets/img/atras_naranja.png";
  constructor(
    private premiosService: PremiosService,
    private storage: Storage,
    public modalCtrl: ModalController,
    private router: Router,
  ) {}


  ngOnInit(): void {
    
  }

  ionViewWillEnter() {
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.colorBack="#000000"
        this.butAtras= "../assets/img/atras_negro.png"
      }
      this.data()
    });
  }


  data(){

    this.storage.get("perfil").then((dato) => {
      this.premiosService.getPuntos(dato.id).subscribe((data:any) => {
        this.puntos = data.puntos
        this.valorTarjeta = data.puntos * (data.tarjetaAPuntos / data.puntosATarjeta)
        this.valorTarjeta = this.valorTarjeta.toFixed(2)
        console.log(data)
      })

      this.premiosService.getPremiosPersonales(dato.id).subscribe(data => {
        this.misPremios = data;
        let d = JSON.parse(JSON.stringify(this.misPremios));
        d = d.map(function(a){
          let f = a.fecha_canje.split('-')
          let fecha = new Date(f[0], f[1], f[2])
          a.fecha_entrega = fecha
          return a
          })
        this.misPremios = d
      })

      this.premiosService.getPremiosUtlizados(dato.id).subscribe(data => {
        this.historial = data;
      })
    });

  }

  async detalle(imagen: string, nombre: string, descripcion: string, precio: string) {
    const modal = await this.modalCtrl.create({
      component: DetallesPremiosPage,
      cssClass: 'DetallesPremios',
      componentProps: {
        'imagen': imagen,
        'nombre': nombre,
        'descripcion': descripcion,
        'precio': precio
      }
    });
    return await modal.present();
  }
  utilizar() {
    this.router.navigate(["/footer/premios"]);
  }

  atras(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.router.navigate(["/footer/premios-inicio"])
  }
}
