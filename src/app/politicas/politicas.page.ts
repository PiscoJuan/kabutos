import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController,ModalController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {ProductoService} from '../servicios/producto.service';
import {CorrectoPage} from '../aviso/correcto/correcto.page';
import {IncorrectoPage} from '../aviso/incorrecto/incorrecto.page';


@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.page.html',
  styleUrls: ['./politicas.page.scss'],
})
export class PoliticasPage implements OnInit {

  contenido : {};
  detalle:string= "";
  constructor( public productoService: ProductoService, private  router:  Router,public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,private storage: Storage,
    ) { }
    
  ngOnInit() {
    this.cargar();
  }

  politicas(){
    console.log("refresh");
     this.productoService.getPolitica().subscribe(data => {
       //console.log("esta es la data "+data["nombre"])
       this.contenido=data;
       if(this.contenido[0]!= null){
        this.detalle = this.contenido[0].detalle;
       }else{
         this.mensajeIncorrecto("Algo sucedio","Ocurrio un poblema, lo estamos solucionando")
       }
       console.log(this.contenido);
 
       },(error)=>{
         console.error(error);
      }) 
  }

  cargar(){
    this.loadingCtrl.create({  
      message: 'Loading.....'   
    }).then((loading) => {  
      loading.present();{
        this.politicas();
    } 
    setTimeout(() => {   
      loading.dismiss();  
    }, 1000 );   
    }); 
  }

  async mensajeCorrecto(titulo:string,mensaje:string){
    const modal = await this.modalCtrl.create({
      component: CorrectoPage,
      cssClass: 'CorrectoProducto',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje
      }
    });
    return await modal.present();
  }


  async mensajeIncorrecto(titulo:string,mensaje:string){
    const modal = await this.modalCtrl.create({
      component: IncorrectoPage,
      cssClass: 'IncorrectoProducto',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje
      }
    });
    return await modal.present();
  }

}
