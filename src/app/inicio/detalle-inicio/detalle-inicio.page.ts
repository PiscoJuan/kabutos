import { Component, Input, OnInit } from '@angular/core';
import { login } from 'src/app/global';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { CorrectoPage } from 'src/app/aviso/correcto/correcto.page';
import { IncorrectoPage } from 'src/app/aviso/incorrecto/incorrecto.page';
import { ShoppingCartService } from 'src/app/servicios/shopping-cart.service';
import { ProductoService } from 'src/app/servicios/producto.service';
declare var window; 
@Component({
  selector: 'app-detalle-inicio',
  templateUrl: './detalle-inicio.page.html',
  styleUrls: ['./detalle-inicio.page.scss'],
})
export class DetalleInicioPage implements OnInit {
  @Input() public tipo;
  @Input() public nombre;
  @Input() public imagen;
  @Input() public precio: number;  
  @Input() public max: number; 
  private correo: String = "";
  elegirEstab: number = 3;
  colorBack:any = "var(--ion-color-naranja-oscuro)";

  constructor(
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private router: Router,
    public modalCtrl: ModalController,
    private shoppingCart: ShoppingCartService,
    public productoService: ProductoService
  ) { }

  ngOnInit() {
    this.storage.get("elegirEstab").then((val) => {
      this.elegirEstab = Number(val);
      if(Number(val) == 2){
        this.colorBack="#000000"
      }
    });
  }

  agregar(id: string) {

    var cantidad = document.querySelectorAll("[id='" + id + "']");
    var num = cantidad[0].innerHTML
    if ((parseInt(num) + 1) > this.max) {
      this.mensajeIncorrecto("Agregar al carrito", "Ha excedido el stock del producto");
    }else{
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
      if (login.login == false && nombre == null) {
        this.dismiss()
        this.router.navigateByUrl('/login');
      } else {
        var cantidad = document.getElementById(id);
        if (parseInt(cantidad.innerHTML) > 0) {
          const prodxcant = {
            'nombre': id,
            'cantidad': parseInt(cantidad.innerHTML),
            'correo': this.correo
          }
          if(this.tipo === "Producto"){
            this.shoppingCart.addProduct(prodxcant).subscribe(data => {
              if (data.valid == "OK") {
                this.mensajeCorrecto("Agregar Producto", "El producto se ha agregado al carrito");
              } else if (data.valid == "NOT") {
                this.mensajeIncorrecto("Agregar Producto", "Ha ocurrido un error, revise su conexión");
              }
            })
          }else{
            this.productoService.addOferta(prodxcant).subscribe(data =>{
              if(data.valid == "OK"){
                this.mensajeCorrecto("Agregar Oferta","El producto se ha agregado al carrito");
              }else if (data.valid == "NOT"){
                this.mensajeIncorrecto("Agregar Oferta","Ha ocurrido un error, revise su conexión"); 
              }  
            })
          }
          window.footer.datos();
          this.dismiss()
        } else {
          this.mensajeIncorrecto("Agregar Producto", "No ha escogido la cantidad para agregar");
          this.dismiss()
        }
      }
    });

  }

  dismiss(){
    this.modalCtrl.dismiss()
  }

  getCorreo() {
    console.log(login.login)
    this.storage.get('correo').then((val) => {
      this.correo = val;
      console.log('name: ', this.correo);

    });

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

}
