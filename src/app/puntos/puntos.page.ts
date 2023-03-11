import { Component, OnInit } from '@angular/core';
import { PremiosService } from '../servicios/premios.service';
import { DetallesPremiosPage } from '../detalles-premios/detalles-premios.page';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { HistorialService } from '../servicios/historial.service';
import { Router } from "@angular/router";
import { NavController } from '@ionic/angular';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.page.html',
  styleUrls: ['./puntos.page.scss'],
})
export class PuntosPage implements OnInit {
  premios: any;
  historiales:any;
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
    public historialService: HistorialService,
    private navCtrlr: NavController,
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
      this.histo()
    });
    
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

  monto() {
    this.router.navigate(["/footer/hacer-regalo-puntos"]);
  }

  histo() {
    this.storage.get('id').then((val)=>{
      if(val!=null){
        this.buscar(val);
      }

    });
  }

  buscarHistorial(id): Observable<object> {
    
    return this.historialService.getHistorial(id);
  }

  async buscar(id) {
    this.buscarHistorial(id).subscribe(
        (data: any) => {
          let historiales = data.filter(pedidos => pedidos.puntos != 0);

          if (Object.keys(historiales).length === 0) {
            
          }
          else {
            console.log("AAAAAAAAAAAAAAAA")
            console.log(historiales)
            this.historiales = historiales;
          }
        }
      );
  }

  atras(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.router.navigate(["/footer/premios-inicio"])
  }

  catalogo() {
    this.router.navigate(["/footer/catalogo"]);
  }
}
