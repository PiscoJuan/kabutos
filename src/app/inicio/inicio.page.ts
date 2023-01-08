import { Component, OnInit } from '@angular/core';
import { CorrectoPage } from '../aviso/correcto/correcto.page';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProductoService } from '../servicios/producto.service';
import { finalize } from 'rxjs/operators';
import { DetalleInicioPage } from './detalle-inicio/detalle-inicio.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  loading;
  producto;
  categorias: any;
  ofertas: any;
  textInput;

  constructor(
    public productoService: ProductoService,
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
    this.iniciar(null)
  }

  async iniciar(event){
    this.productoService.getInicio().pipe(
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
  }

  async buscar(){
    console.log(this.textInput)
    await this.showLoading2();
    this.productoService.getInicioBuscar(this.textInput)
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
