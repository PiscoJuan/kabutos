import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController, ModalController } from '@ionic/angular'
import { Storage } from '@ionic/storage';
import { login } from './../global';
import { Router } from '@angular/router';
import { CorrectoPage } from '../aviso/correcto/correcto.page';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { NavParamsService } from '../servicios/nav-params.service';
declare var window;

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage implements OnInit {

  dataFromCart: {};
  oferta: {};
  almacenado: {};
  elegirEstab: number = 1;
  private correo: String = "";
  constructor(public productoService: ProductoService, public modalCtrl: ModalController, public loadingCtrl: LoadingController,
    private alert: AlertController, private storage: Storage, private router: Router, private navParamsService: NavParamsService) { }

  ngOnInit() {
    this.cargaPantalla();
    this.getCorreo();
    this.loadData();
  }

  ionViewWillEnter() {
    this.storage.get("elegirEstab").then((val) => {
      this.elegirEstab = Number(val);
      console.log("aaaaaaaaaaaaa")
      console.log(this.elegirEstab)
      console.log("refresh");
      this.datos(null)
    });
  }

  datos(event){
    this.productoService.getOferta(this.elegirEstab).subscribe(data => {
      this.oferta = data;
      console.log(this.oferta);
      if (event)
          event.target.complete();
    }, (error) => {
      console.error(error);
      if (event)
          event.target.complete();
    })
  }

  ionViewDidEnter() {
    this.dataFromCart = this.navParamsService.getNavData();
    this.getDataFromCarrito();
    this.setData();
  }

  ionViewWillLeave() {
    var cantidades = document.querySelectorAll('.cantidad');
    console.log(cantidades);
    let datos = [];
    for (var i = 0; i < cantidades.length; i++) {
      var id = cantidades[i].getAttribute("id");
      console.log('Guardaré el id ', id)
      console.log('Guardare la cantidad ', cantidades[i].innerHTML);
      datos.push({ 'id': id, 'cantidad': cantidades[i].innerHTML });
    }
    console.log(datos);
    this.saveData(datos);
  }

  cargaPantalla() {
    this.loadingCtrl.create({
      message: 'Loading.....'
    }).then((loading) => {
      loading.present(); {
        this.ionViewDidEnter();
      }
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    });
  }

  agregar(id: string,max) {
    var cantidad = document.querySelectorAll("[id='" + id + "']");
    console.log(cantidad[0])
    var num = cantidad[0].innerHTML
    console.log(typeof (num))
    if ((parseInt(num) + 1) > max) {
      this.mensajeIncorrecto("Agregar Oferta", "Ha excedido el stock del producto");
    }else{
      cantidad[0].innerHTML = String(parseInt(cantidad[0].innerHTML) + 1);
    }
  }

  quitar(id: string) {
    //var cantidad = document.getElementById(id);
    //var num  = cantidad.getAttribute('value')
    var cantidad = document.querySelectorAll("[id='" + id + "']");
    var num = cantidad[0].innerHTML
    if ((parseInt(num) - 1) < 0) {
      //cantidad.setAttribute('value',String(parseInt(num)));
      cantidad[0].innerHTML = String(parseInt(cantidad[0].innerHTML));

    } else {
      //cantidad.setAttribute('value',String(parseInt(num)-1));
      cantidad[0].innerHTML = String(parseInt(cantidad[0].innerHTML) - 1);
      //this.saveData(id,cantidad[0].innerHTML);

    }
  }

  carrito(id: string) {

    this.getCorreo()
    this.storage.get('name').then((nombre) => {
      console.log('Name is', nombre);
      if (login.login == false && nombre == null) {
        login.oferta = true;
        this.router.navigateByUrl('/login');
      } else {
        var cantidad = document.getElementById(id);
        console.log(cantidad)
        if (parseInt(cantidad.innerHTML) > 0) {
          const oferta = {
            'nombre': this.getNombre(id),
            'correo': this.correo,
            'cantidad': parseInt(cantidad.innerHTML)
          }
          this.productoService.addOferta(oferta).subscribe(data => {
            if (data.valid == "OK") {
              this.mensajeCorrecto("Agregar Oferta", "El producto se ha agregado al carrito");
            } else if (data.valid == "NOT") {
              this.mensajeIncorrecto("Agregar Oferta", "Ha ocurrido un error, revise su conexión");
            }
          })
          /* Aqui tienes que enviar los datos que se obtengan de cantidad para el carrito*/
        } else {
          this.mensajeIncorrecto("Agregar Producto", "No ha escogido la cantidad para agregar");
        }
        window.footer.datos();
      }
    });
  }


  async mensajeCorrecto(titulo: string, mensaje: string) {
    const modal = await this.modalCtrl.create({
      component: CorrectoPage,
      cssClass: 'CorrectoOferta',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje
      }
    });
    return await modal.present();
  }

  getCorreo() {
    console.log(login.login)
    this.storage.get('correo').then((val) => {
      this.correo = val;
      console.log('name: ', this.correo);

    });

  }

  async mensajeIncorrecto(titulo: string, mensaje: string) {
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

  getOfertLen() {
    var pindex = 0;
    for (let p in this.oferta) {
      pindex = +p + 1;
    }
    return pindex;
  }

  getNombre(id: string) {
    for (let i = 0; i < this.getOfertLen(); i++) {
      if (id === this.oferta[i]['id_unico']) {
        return this.oferta[i]['nombre'];
      }
    }

  }

  getDataFromCarritoLen() {
    var pindex = 0;
    for (let p in this.dataFromCart) {
      pindex = +p + 1;
    }
    return pindex;
  }

  getDataFromCarrito() {
    console.log(this.dataFromCart)

    for (var i = 0; i < this.getDataFromCarritoLen(); i++) {
      try {
        var cantidad = document.querySelectorAll('#' + this.dataFromCart[i]['id']);
        //var cantidad=document.getElementsByClassName('cantidad');
        console.log(cantidad);
        cantidad[2].innerHTML = this.dataFromCart[i]['cantidad'];
        //id.innerHTML="100";
        console.log(cantidad[2].innerHTML);
      } catch (e) {
        console.log(e);
        cantidad[0].innerHTML = this.dataFromCart[i]['cantidad'];
        continue;
      }
    }
  }

  getStoreLen() {
    var pindex = 0;
    for (let p in this.almacenado) {
      pindex = +p + 1;
    }
    return pindex;
  }

  saveData(estado: any) {
    this.storage.set('ofertas', estado);
  }

  loadData() {
    console.log(login.login)
    this.storage.get('ofertas').then((val) => {
      this.almacenado = val;
      //console.log('productos: ',this.almacenado);

    });

  }

  setData() {
    console.log("Estoy en el setData");
    console.log(this.getStoreLen());
    //var cantidades=document.getElementsByClassName('cantidad');
    //console.log(cantidades);
    var cantidad = document.querySelectorAll('.cantidad');
    for (let i = 0; i < this.getStoreLen(); i++) {
      try {
        console.log(this.almacenado[i]['id']);
        //var cantidad= document.querySelectorAll('.cantidad');
        console.log(cantidad);
        //var id=cantidades[i].getAttribute("id");
        //console.log('Obtengo del getData ',cantidad)

        cantidad[i].innerHTML = this.almacenado[i]['cantidad'];
        console.log('Seteo la siguiente cantidad ', cantidad[i].innerHTML);
      } catch (e) {
        console.log(e);
        continue;
      }
    }
  }



}
