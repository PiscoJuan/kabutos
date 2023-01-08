import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
import { Producto } from '../modelo/producto';
import { Producto_Carrito } from '../modelo/producto_carrito';
import { Observable, Subject } from 'rxjs';
import { login } from './../global'
import 'rxjs/add/operator/map';
import { ChildActivationStart, Router } from '@angular/router';
import { AlertController, IonToggle, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DetallesProductosPage } from '../detalles-productos/detalles-productos.page';
import { ShoppingCartService } from '../servicios/shopping-cart.service';
import { CorrectoPage } from '../aviso/correcto/correcto.page';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { NavParamsService } from '../servicios/nav-params.service';

declare var window;
@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  opcion: string = '0';
  textInput: string = null;
  productoInput: string = '';
  producto: Array<Producto> = [];
  productoParcialAZ: Array<Producto> = [];
  productoParcialZA: Array<Producto> = [];
  productoParcialMayor: Array<Producto> = [];
  productoParcialMenor: Array<Producto> = [];
  productoParcial: Array<Producto> = [];

  verSeleccion: string = '';
  dataFromCart: {};
  n = 0;
  num: any = 0;
  loaderToShow: any;
  almacenado: {};
  private correo: String = "";
  public cantidad: string = "0";
  public page: number = 0;
  public pageAZ: number = 0;
  public pageZA: number = 0;
  public pageMayor: number = 0;
  public pageMenor: number = 0;
  public flag: boolean = true;

  public filtro: String = "vendidos";

  constructor(
    public productoService: ProductoService, private router: Router, private alert: AlertController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public modalCtrl: ModalController,
    private shoppingCart: ShoppingCartService,
    private navParamsService: NavParamsService,
  ) { }

  ngOnInit() {
    this.cargaPantalla();
    this.getCorreo();
  }



  ionViewWillEnter() {
    console.log("refresh");
    this.datos(null, this.filtro);
    this.loadData();
  }

  datos(event, filtro) {
    this.flag = true;

    if (filtro == "vendidos") {
      this.flag = true;
      this.page += 1;
      this.productoService.getProductosByFiltro(filtro, this.page).subscribe((data: Array<Producto>) => {
        this.productoParcial.push(...data);
        this.producto = this.productoParcial;
        console.log(data);
        if (event)
          event.target.complete();
      }, (error) => {
        console.error(error);
        if (event)
          event.target.complete();
      });
    }
    else if (filtro == "descendente") {
      this.flag = true;
      this.pageZA += 1;
      this.productoService.getProductosByFiltro(filtro, this.pageZA).subscribe((data: Array<Producto>) => {
        this.productoParcialZA.push(...data);
        this.producto = this.productoParcialZA;
        console.log(data);
        if (event)
          event.target.complete();
      }, (error) => {
        console.error(error);
        if (event)
          event.target.complete();
      });
    }
    else if (filtro == "ascendente") {
      this.flag = true;
      this.pageAZ += 1;
      this.productoService.getProductosByFiltro(filtro, this.pageAZ).subscribe((data: Array<Producto>) => {
        this.productoParcialAZ.push(...data);
        this.producto = this.productoParcialAZ;
        console.log(data);
        if (event)
          event.target.complete();
      }, (error) => {
        console.error(error);
        if (event)
          event.target.complete();
      });
    }
    else if (filtro == "menor") {
      this.flag = true;
      this.pageMenor += 1;
      this.productoService.getProductosByFiltro(filtro, this.pageMenor).subscribe((data: Array<Producto>) => {
        this.productoParcialMenor.push(...data);
        this.producto = this.productoParcialMenor;
        console.log(data);
        if (event)
          event.target.complete();
      }, (error) => {
        console.error(error);
        if (event)
          event.target.complete();
      });
    }
    else if (filtro == "mayor") {
      this.flag = true;
      this.pageMayor += 1;
      this.productoService.getProductosByFiltro(filtro, this.pageMayor).subscribe((data: Array<Producto>) => {
        this.productoParcialMayor.push(...data);
        this.producto = this.productoParcialMayor;
        console.log(data);
        if (event)
          event.target.complete();
      }, (error) => {
        console.error(error);
        if (event)
          event.target.complete();
      });
    }
  }

  ionViewDidEnter() {
    this.flag = true;
    this.dataFromCart = this.navParamsService.getNavData();
    this.getDataFromCarrito();
  }

  ionViewWillLeave() {
    this.flag = true;
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
        this.ionViewWillEnter();
      }
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    });
  }

  ordenar(data) {
    this.productoService.getProductosByFiltro(data, 1).subscribe((data: Array<Producto>) => {
      this.producto = data;
    }
    );
  }

  capturar() {
    let data = JSON.parse(JSON.stringify(this.producto));
    console.log(this.opcion)
    if (this.opcion.localeCompare("descendente") == 0) {
      this.filtro = "descendente";
      this.datos(null, this.filtro);
    }
    else if (this.opcion.localeCompare("ascendente") == 0) {
      this.filtro = "ascendente";
      this.datos(null, this.filtro);
    }
    else if (this.opcion.localeCompare("menor") == 0) {
      this.filtro = "menor";
      this.datos(null, this.filtro);
    }
    else if (this.opcion.localeCompare("mayor") == 0) {
      this.filtro = "mayor";
      this.datos(null, this.filtro);
    }
    else if (this.opcion.localeCompare("vendidos") == 0) {
      this.filtro = "vendidos";
      this.datos(null, this.filtro);
    }
  }


  buscarProducto() {
    this.flag = false;
    this.productoInput = this.textInput;
    console.log(this.productoInput)
    this.productoService.getProductoBuscar(this.productoInput).subscribe((data: Array<Producto>) => {

      this.producto = data;
      console.log(this.producto);
      if (Object.keys(this.producto).length === 0) {
        this.mensajeIncorrecto("Producto no encontrado", "No se ha podido encontrar el producto, intente de nuevo")
      }

    }, (error) => {
      console.error(error);
      this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
    })
  }

  agregar(id: string, max) {

    var cantidad = document.querySelectorAll("[id='" + id + "']");
    console.log(cantidad[0])
    var num = cantidad[0].innerHTML
    console.log((parseInt(num) + 1) > max)
    if ((parseInt(num) + 1) > max) {
      this.mensajeIncorrecto("Agregar Producto", "Ha excedido el stock del producto");
    } else {
      cantidad[0].innerHTML = String(parseInt(cantidad[0].innerHTML) + 1);
    }
  }

  quitar(id: string) {
    var cantidad = document.querySelectorAll("[id='" + id + "']");
    var num = cantidad[0].innerHTML
    if ((parseInt(num) - 1) < 0) {
      cantidad[0].innerHTML = String(parseInt(cantidad[0].innerHTML));

    } else {
      cantidad[0].innerHTML = String(parseInt(cantidad[0].innerHTML) - 1);
    }
  }

  carrito(id: string) {
    this.getCorreo()
    this.storage.get('name').then((nombre) => {
      console.log('Name is', nombre);
      if (login.login == false && nombre == null) {
        login.producto = true;
        this.router.navigateByUrl('/login');
      } else {
        var cantidad = document.getElementById(id);
        console.log("La cantidad que se agrega al carrito es: ", cantidad.innerHTML);
        if (parseInt(cantidad.innerHTML) > 0) {
          const prodxcant = {
            'nombre': this.getNombre(id),
            'cantidad': parseInt(cantidad.innerHTML),
            'correo': this.correo
          }
          this.shoppingCart.addProduct(prodxcant).subscribe(data => {
            if (data.valid == "OK") {
              //this.storage.set(id,parseInt(cantidad.innerHTML));
              //var number = this.getNumber();
              //this.actualizarNum(number);
              this.mensajeCorrecto("Agregar Producto", "El producto se ha agregado al carrito");
            } else if (data.valid == "NOT") {
              this.mensajeIncorrecto("Agregar Producto", "Ha ocurrido un error, revise su conexión");

            }
          })
        } else {
          this.mensajeIncorrecto("Agregar Producto", "No ha escogido la cantidad para agregar");
        }
        window.footer.datos();
      }
    });

  }

  getCorreo() {
    console.log(login.login)
    this.storage.get('correo').then((val) => {
      this.correo = val;
      console.log('name: ', this.correo);

    });

  }

  async mensaje(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alert.create({
      cssClass: titulo,
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }


  showLoading(id: string) {
    this.loadingCtrl.create({
      message: 'Loading.....'
    }).then((loading) => {
      loading.present(); {
        this.carrito(id);
      }
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    });
  }
  showLoading2() {
    this.loadingCtrl.create({
      message: 'Loading.....'
    }).then((loading) => {
      loading.present(); {
        this.buscarProducto();
      }
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    });
  }



  showLoading3() {
    this.loadingCtrl.create({
      message: 'Loading.....'
    }).then((loading) => {
      loading.present(); {
        this.capturar();
      }
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    });
  }


  async detalle(imagen: string, nombre: string, descripcion: string, precio: string) {
    const modal = await this.modalCtrl.create({
      component: DetallesProductosPage,
      cssClass: 'DetallesProducto',
      componentProps: {
        'imagen': imagen,
        'nombre': nombre,
        'descripcion': descripcion,
        'precio': precio
      }
    });
    return await modal.present();
  }

  async mensajeCorrecto(titulo: string, mensaje: string) {
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

  actualizarNum(valor: string) {
    var tmp = valor;
    console.log(tmp)
    if (tmp == "") {
      tmp = String(1);
    } else {
      var num = parseInt(tmp)
      num = num + 1;
      tmp = String(num)
    }
    console.log("voy a cambiar el valor a", tmp)
    this.storage.set('number', tmp);
  }

  getNumber() {
    var dato = "";
    this.storage.get('number').then((number) => {
      dato = number;
    });
    console.log("voy a devolver", dato)
    return dato;
  }

  getNum(id: string) {
    var dato = "";
    this.storage.get(id).then((data) => {
      dato = data;
    });
    return dato;
  }

  cargarNum(id: string) {
    var cantidad = document.getElementById(id);
    console.log(cantidad)
    var num = cantidad.innerHTML
    console.log(typeof (num))
    var num = this.getNum(id);
    console.log(num)
    if (num != null) {
      console.log("existen datos :'v")
      cantidad.innerHTML = String(num);
    } else {
      console.log("no existe datos :C")
      cantidad.innerHTML = "0";
    }


  }

  getProductLen() {
    var pindex = 0;
    for (let p in this.producto) {
      pindex = +p + 1;
    }
    return pindex;
  }

  getStoreLen() {
    var pindex = 0;
    for (let p in this.almacenado) {
      pindex = +p + 1;
    }
    return pindex;
  }


  getNombre(id: string) {
    for (let i = 0; i < this.getProductLen(); i++) {
      if (id === this.producto[i]['id_unico']) {
        return this.producto[i]['nombre'];
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
        console.log(cantidad);
        cantidad[0].innerHTML = this.dataFromCart[i]['cantidad'];
        console.log(cantidad[0].innerHTML);
      } catch (e) {
        console.log(e);
        cantidad[0].innerHTML = this.dataFromCart[i]['cantidad'];
        continue;
      }
    }
  }

  saveData(estado: any) {
    this.storage.set('productos', estado);
  }

  loadData() {
    console.log(login.login)
    this.storage.get('productos').then((val) => {
      this.almacenado = val;
    });

  }

  setData() {
    console.log("Estoy en el setData");
    console.log(this.getStoreLen());
    var cantidad = document.querySelectorAll('.cantidad');
    for (let i = 0; i < this.getStoreLen(); i++) {
      try {
        console.log(this.almacenado[i]['id']);
        console.log(cantidad);
        cantidad[i].innerHTML = this.almacenado[i]['cantidad'];
        console.log('Seteo la siguiente cantidad ', cantidad[i].innerHTML);
      } catch (e) {
        console.log(e);
        continue;
      }
    }
  }

  cargandoSiguientes(event) {
    setTimeout(() => {
      event.target.complete();
      this.datos(event, this.filtro);
    })
  }
}





