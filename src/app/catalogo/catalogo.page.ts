import { Component, OnInit } from '@angular/core';
import { PremiosService } from '../servicios/premios.service';
import { DetallesPremiosPage } from '../detalles-premios/detalles-premios.page';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
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
      })

      this.premiosService.getPremiosUtlizados(dato.id).subscribe(data => {
        this.historial = data;
      })
    });

  }

  async detalle(imagen: string, nombre: string, descripcion: string, precio: string, cantidad:number) {
    if(cantidad>0){
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

}
