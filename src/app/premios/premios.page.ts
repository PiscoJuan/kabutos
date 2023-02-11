import { Component, OnInit } from '@angular/core';
import { PremiosService } from '../servicios/premios.service';
import { DetallesPremiosPage } from '../detalles-premios/detalles-premios.page';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-premios',
  templateUrl: './premios.page.html',
  styleUrls: ['./premios.page.scss'],
})
export class PremiosPage implements OnInit {
  premios: any;
  puntos: any;
  valorTarjeta: any;
  misPremios: any;
  historial: any;
  constructor(
    private premiosService: PremiosService,
    private storage: Storage,
    public modalCtrl: ModalController,
  ) {}


  ngOnInit(): void {
    
  }

  ionViewWillEnter() {
    this.data()
  }


  data(){
    this.premiosService.getPremios().subscribe( data => {
      this.premios = data
    })

    this.storage.get("perfil").then((dato) => {
      this.premiosService.getPuntos(dato.id).subscribe((data:any) => {
        this.puntos = data.puntos
        this.valorTarjeta = data.puntos * (data.tarjetaAPuntos / data.puntosATarjeta)
        this.valorTarjeta = this.valorTarjeta.toFixed(2)
        console.log(data)
      })

      this.premiosService.getPremiosPersonales(dato.id).subscribe(data => {
        this.misPremios = data;
        console.log("porcanjear", this.misPremios)

        let d = JSON.parse(JSON.stringify(this.misPremios));
        d = d.map(function(a){
          let f = a.fecha_canje.split('-')
          let fecha = new Date(f[0], f[1], f[2])
          a.fecha_entrega = fecha
          return a
          })
        this.misPremios = d
        console.log("dat", this.premios)
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

}
