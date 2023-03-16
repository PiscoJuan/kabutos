import { Component, OnInit } from '@angular/core';
import { CorrectoPage } from '../aviso/correcto/correcto.page';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProductoService } from '../servicios/producto.service';
import { PublicidadService } from '../servicios/publicidad.service';
import { finalize } from 'rxjs/operators';
import { DetalleInicioPage } from './detalle-inicio/detalle-inicio.page';
import { BaneoService } from '../servicios/baneo.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {

  loading;
  id;
  producto;
  categorias: any;
  ofertas: any;
  textInput;
  superior: any;
  inferior: any;
  elegirEstab: number = 3;
  colorBack:any = "var(--ion-color-naranja-oscuro)";
  constructor(
    public productoService: ProductoService,
    public publicidadService: PublicidadService,
    public modalController: ModalController,
    private router: Router,
    private alert: AlertController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public modalCtrl: ModalController,
    private baneoService: BaneoService,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.storage.set("tarjetaRegaloMonto",'no')
    this.storage.set("tarjetaRegaloproducto",'no')
    this.storage.get("id").then((val) => {
      this.id=Number(val);
    })
    await this.showLoading2();
    this.baneoService.actualizarVersion(this.id).subscribe((data:any) => {
      if (data.valid != "OK"){
        console.log("ok")
      }
    })
    this.baneoService.revisarVersion(2).subscribe((data:any) => {
      if (data.valid != "OK"){
        this.mensajeIncorrecto("Versión antigua", "Se encuentra usando una versión antigua de su aplicación, por favor actualize su app en la tienda.");
      }
    })
    this.iniciar(null)
  }

  async iniciar(event){
    this.storage.get("elegirEstab").then((val) => {
      this.elegirEstab = Number(val);
      if(Number(val) == 2){
        this.colorBack="#000000"
      }
      this.productoService.getInicio(Number(val)).pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      ).subscribe(data => {
        this.producto = data['productos'];
        console.log(this.producto)
        this.categorias = data['categorias'];
        this.ofertas = data['ofertas'];
        if (event)
        event.target.complete();
      }, (error) => {
        console.error(error);
        if (event)
        event.target.complete();
      });
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

  async buscar(){
    console.log(this.textInput)
    await this.showLoading2();
    this.productoService.getInicioBuscar(this.textInput,this.elegirEstab)
    .pipe(
      finalize(async () => {
        await this.loading.dismiss();
      })
    )
    .subscribe(data => {
      this.producto = data['productos'];
      this.categorias = data['categorias'];
      this.ofertas = data['ofertas'];

    },
    err => {
      this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
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

  async detalle(tipo,nombre, imagen, precio,max){
    const modal = await this.modalController.create({
      component: DetalleInicioPage,
      cssClass: 'IncorrectoProducto',
      componentProps: { tipo,nombre, imagen, precio,max }, 
    });
    return await modal.present();
  }

  ofertasPage() {
    this.router.navigateByUrl('/footer/ofertas');
  }

  productosPage() {
    this.router.navigateByUrl('/footer/producto');
  }

  categoriasPage() {
    this.router.navigateByUrl('/footer/categorias');
  }

  mostrar(id) {
    this.storage.set('categoria',id);
    this.router.navigateByUrl('/footer/categorias/detalle-categoria');
  }

}
