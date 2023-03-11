import { Component, OnInit } from '@angular/core';
import { CorrectoPage } from '../aviso/correcto/correcto.page';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProductoService } from '../servicios/producto.service';
import { PublicidadService } from '../servicios/publicidad.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-inicio',
  templateUrl: './elegir-estab.page.html',
  styleUrls: ['./elegir-estab.page.scss'],
})

export class ElegirEstabPage implements OnInit {

  loading;
  producto;
  categorias: any;
  ofertas: any;
  textInput;
  superior: any;
  inferior: any;
  elegirEstab: number = 3;
  constructor(
    public productoService: ProductoService,
    public publicidadService: PublicidadService,
    public modalController: ModalController,
    private router: Router,
    private alert: AlertController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.storage.set("tarjetaRegaloMonto",'no')
    this.storage.set("tarjetaRegaloproducto",'no')
    await this.showLoading2();
    this.storage.get("elegirEstab").then((val) => {
      this.elegirEstab = Number(val);
      console.log("aaaaaaaaaaaaa")
      console.log(this.elegirEstab)
      this.iniciar(null)
    });
  }

  async iniciar(event){
    this.productoService.getInicio(this.elegirEstab).pipe(
      finalize(async () => {
        await this.loading.dismiss();
      })
    ).subscribe(data => {
      this.producto = data['productos'];
      this.categorias = data['categorias'];
      this.ofertas = data['ofertas'];
      if (event)
      event.target.complete();
    }, (error) => {
      console.error(error);
      if (event)
      event.target.complete();
    });

    this.publicidadService.getSuperior()
    .subscribe((data: any) => {
      this.superior = data;
      if(data.length == 0) {
        this.superior = [ {
          nombre: "default",
          img: "../assets/img/publicidad-ej1.jpg",
        }];        
      } else {
        this.superior.map((x) => x.img = "http://cabutoshop.pythonanywhere.com/"+x.img);
      }
      console.log("sup", this.superior);
      if (event)
      event.target.complete();
    }, (error) => {
      console.error(error);
      if (event)
      event.target.complete();
    });
  
    this.publicidadService.getInferior()
    .subscribe((data: any) => {
      this.inferior = data;
        if(data.length == 0) {
          this.inferior = [ {
            nombre: "default",
            img: "../assets/img/publicidad-ej1.jpg",
          }];
        } else {
          this.inferior.map((x) => x.img = "http://cabutoshop.pythonanywhere.com/"+x.img);
        }
      if (event)
      event.target.complete();
    }, (error) => {
      console.error(error);
      if (event)
      event.target.complete();
    });
  }

  async showLoading2() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading.....'
    });
    await this.loading.present();

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

  cabutosPage() {
    this.storage.set("elegirEstab",1)
    this.router.navigateByUrl('/footer/inicio');
  }

  licoreriaPage() {
    this.storage.set("elegirEstab",2)
    this.router.navigateByUrl('/footer/inicio');
  }
}
