import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias:any;

  constructor(public productoService: ProductoService,
    private router: Router,
    private alert: AlertController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log("refresh");
    this.productoService.getCategoria().subscribe(data => {
      console.log(data)
      this.categorias = data;
    }, (error) => {
      console.error(error);
    });
  }

  mostrar(id) {
    this.storage.set('categoria',id);
    this.router.navigateByUrl('/footer/categorias/detalle-categoria');
    console.log(id)
  }

}
