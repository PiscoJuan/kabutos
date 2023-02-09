import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { DetallesProductosPage } from '../../detalles-productos/detalles-productos.page';
import { Storage } from '@ionic/storage';
import { login } from 'src/app/global'
import { ProductoService } from '../../servicios/producto.service';
import { ShoppingCartService } from '../../servicios/shopping-cart.service';
import { CorrectoPage } from '../../aviso/correcto/correcto.page';
import { IncorrectoPage } from '../../aviso/incorrecto/incorrecto.page';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-categoria',
  templateUrl: './detalle-categoria.page.html',
  styleUrls: ['./detalle-categoria.page.scss'],
})
export class DetalleCategoriaPage implements OnInit {
  opcion: string = '0';
  textInput: string = null;
  categoria;
  producto: {};
  loader:any;
  elegirEstab: number = 3;
  private correo: String = "";
  productoInput: string = '';
  verSeleccion: string = '';

  constructor(
    public productoService: ProductoService,
    
    private router: Router,
    private shoppingCart: ShoppingCartService,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCorreo();
    login.categoria = false;
    this.storage.get('categoria').then((nombre) => {
      if (nombre != null) {
        this.categoria = nombre;
      }
      this.storage.get("elegirEstab").then((val) => {
        this.elegirEstab = Number(val);
        console.log("aaaaaaaaaaaaa")
        console.log(this.elegirEstab)
        this.datos();
      });
    }
    );
  }

  async datos(){
    await this.showLoading2();
    this.productoService.getProductosCategoria(this.categoria,this.elegirEstab)
    .pipe(
      finalize(async () => {
        await this.loader.dismiss();
      })
    )
    .subscribe(data => {
      this.producto=data
    }, (error) => {
      console.error(error);
    });

  }



  ordenarDescendente(data) { 

    let orderedListZA = data.sort(function(a,b){
      if(a.nombre>b.nombre){
        return -1
      }
      else if(a.nombre < b.nombre){
          return 1
      }
      else{return 0}
    })
    this.producto = orderedListZA;
  }

  capturar() {
    let data = JSON.parse(JSON.stringify(this.producto));
    console.log(this.opcion)
    if (this.opcion.localeCompare("descendente")==0){
      console.log("entra")
      this.ordenarDescendente(data);
    }
    else if (this.opcion.localeCompare("ascendente")==0){
      this.producto = data.sort(function(a,b){
        
        if(a.nombre<b.nombre){
          return -1
        }
        else if(a.nombre > b.nombre){
            return 1
        }
        else{return 0}
      })
    }
    else if(this.opcion.localeCompare("menor")==0){
      this.producto = data.sort(function(a,b){
        return a.precio - b.precio
      });
    }
    else if(this.opcion.localeCompare("mayor")==0){
      this.producto = data.sort(function(a,b){
        console.log(a)
        return b.precio - a.precio
      });
    }
    
  }

  

  buscarProducto() {
    this.productoInput = this.textInput;
    console.log(this.productoInput)
    this.productoService.getProductoBuscar(this.productoInput).subscribe(data => {

      this.producto = data;
      console.log(this.producto);
      if (Object.keys(this.producto).length === 0 && this.productoInput != null) {
        this.mensajeIncorrecto("Producto no encontrado", "No se ha podido encontrar el producto, intente de nuevo")
      }
      if(this.productoInput ==null) {
        this.productoService.getProductosCategoria(this.categoria,this.elegirEstab)
        .pipe(
          finalize(async () => {
            await this.loader.dismiss();
          })
        )
        .subscribe(data => {
          this.producto=data
        }, (error) => {
          console.error(error);
        });
      }

    }, (error) => {
      console.error(error);
      this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
    })
  }

  agregar(id: string) {

    var cantidad = document.querySelectorAll("[id='" + id + "']");
    console.log(cantidad[0])
    var num = cantidad[0].innerHTML
    console.log(typeof (num))
    cantidad[0].innerHTML = String(parseInt(cantidad[0].innerHTML) + 1);
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
      if (login.login == false && nombre == null) {
        login.categoria = true;
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
              this.mensajeCorrecto("Agregar Producto", "El producto se ha agregado al carrito");
            } else if (data.valid == "NOT") {
              this.mensajeIncorrecto("Agregar Producto", "Ha ocurrido un error, revise su conexión");
            }
          })
        } else {
          this.mensajeIncorrecto("Agregar Producto", "No ha escogido la cantidad para agregar");
        }
      }
    });

  }

  getNombre(id: string) {
    for (let i = 0; i < this.getProductLen(); i++) {
      if (id === this.producto[i]['id_unico']) {
        return this.producto[i]['nombre'];
      }
    }

  }

  getProductLen() {
    var pindex = 0;
    for (let p in this.producto) {
      pindex = +p + 1;
    }
    return pindex;
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

  getCorreo() {
    console.log(login.login)
    this.storage.get('correo').then((val) => {
      this.correo = val;
      console.log('name: ', this.correo);

    });

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

  async showLoading2() {
    this.loader = await this.loadingCtrl.create({
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
  
 
  
}
