import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import {ShoppingCartService} from '../.././servicios/shopping-cart.service';
import {CorrectoPage} from '../../aviso/correcto/correcto.page';
import {IncorrectoPage} from '../../aviso/incorrecto/incorrecto.page';
declare var window;
@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  constructor(public navCtrol: NavController, public navParams: NavParams,private  router:  Router,
    public modalCtrl: ModalController,
    private alert: AlertController,
    private loading: LoadingController,
    private shoppingCart: ShoppingCartService,) { }

  ngOnInit() {
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

  aceptar(){
    var nombre = this.navParams.get('nombre');
    var cantidad = this.navParams.get('cantidad');
    var correo = this.navParams.get('correo');
    var div = this.navParams.get('div');
    var tot = this.navParams.get('tot');
    var total =this.navParams.get('valor');
    var subtotal= this.navParams.get("subtotal");
    var compara = this.navParams.get("compara");
    var subtot = 0;
    console.log("ahora esto en el otro tsd",div)
    console.log("aqui estpa el totla a pagar",total)

    const prodxcant={
      'nombre': nombre,
      'cantidad': parseInt(cantidad),
      'correo': correo
    }
    this.shoppingCart.quitarCarrito(prodxcant).subscribe(data =>{
      if(data.valid == "OK"){
        div.style.display = "none";
        total.innerHTML=""+tot+"";
        subtotal[parseInt(compara)].innerHTML = "0.00";
        this.mensajeCorrecto("Eliminación Exitosa","ha eliminado del carrito");
      }else if (data.valid == "NOT"){
        this.mensajeIncorrecto("No se pudo completar la operacion","Ha ocurrido un error, revise su conexión");
      }else{
        this.mensajeIncorrecto("No se pudo completar la operacion","Ha ocurrido un error, revise su conexión");
      }
      window.footer.datos();
    })
    this.modalCtrl.dismiss();
    
  }

  salir(){
    this.modalCtrl.dismiss();
  }
}
