import { Component, OnInit } from '@angular/core';
import {login} from  '../global'
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Storage } from '@ionic/storage';
import {NotificacionesService} from '../servicios/notificaciones.service';
import {IncorrectoPage} from '../aviso/incorrecto/incorrecto.page';
import { ShoppingCartService } from '../servicios/shopping-cart.service';
declare var window;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
  usuario:String="../assets/img/avatar.png";
  notificacion:String="../assets/img/notificaciones.png";
  home:String="../assets/img/home.png";
  carrito:String="../assets/img/carrito.png";
  selectedPath = '';
  tab:String;tab_carrito:String;
  notificaciones : {};
  rutalogo:any = "../assets/img/logo.png";
  public number:String="0";
  public cosas=0;
  elegirEstab: number = 3;
  colorBack:any = "var(--ion-color-naranja-oscuro)"
  constructor(private router: Router,
    private storage: Storage,
    private notificacionesService: NotificacionesService,
    private shoppingService: ShoppingCartService) {
      window.footer=this
     }

  ngOnInit() {
    this.storage.get("elegirEstab").then((val) => {
      this.elegirEstab = Number(val);
      if(this.elegirEstab==2){
        this.rutalogo= "../assets/img/licorlogo02.png";
        this.colorBack="#000000"
      }
    });
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.datos();
        if(event && event.url){
          this.selectedPath = event.url;
        }
        this.storage.get('cosas').then((valor)=>{
          if(valor!= null){
            this.cosas=valor;
          }else{
            this.cosas=0;
          }
        })
        this.storage.get('name').then((nombre) => {
          if(login.login ==false && nombre == null ){
            this.tab="login";
            this.tab_carrito="login";
          }else{
            this.tab="perfil";
            this.tab_carrito="shopping-cart";
          }
        });
        if(event.url=="/footer/shopping-cart"){
          this.carrito="../assets/img/carrito_activo.png";
        }else{
          this.carrito="../assets/img/carrito.png";
        }
        if(event.url=="/footer/perfil"){
          this.usuario="../assets/img/avatar_perfil2.png";
          this.notificacion="../assets/img/notificaciones.png";
          this.home="../assets/img/home.png";
        }else if(event.url=="/footer/notificacion"){
          this.usuario="../assets/img/avatar.png";
          this.notificacion="../assets/img/notificaciones_activo.png";
          this.home="../assets/img/home.png";
        }else if(event.url=="/footer/inicio" || event.url=="/"){
          this.usuario="../assets/img/avatar.png";
          this.home="../assets/img/home_activo.png";
          this.notificacion="../assets/img/notificaciones.png";
        }else{
          this.usuario="../assets/img/avatar.png";
          this.home="../assets/img/home.png";
          this.notificacion="../assets/img/notificaciones.png";
        }
      }
    });
  }

  datos(){

    this.storage.get('correo').then((val) => {
      if(val != null){
        let info = {
          'correo': val,
          'contrasena': 'xxxxx'
        };
        this.shoppingService.showCart(info)
      .subscribe(data => {

        if (data.hasOwnProperty(0)) {
          this.cosas=data[0].total
          this.storage.set('cosas', this.cosas);
        }else{
          this.cosas=data.total
          this.storage.set('cosas', this.cosas)
        }
      }, (error) => {
        console.error(error);
      }); 
      }

    });
    
      
     this.notificacionesService.getNotificaciones().subscribe(data => {

       this.notificaciones=data;
       var valor = 0;
       for(var i = 0;i<Object.entries(this.notificaciones).length;i++){
         var estado=this.notificaciones[i].estado
         if(estado == 'NOT'){
           valor = valor + 1
         }
       }
       this.number =String(valor)
       },(error)=>{
         console.error(error);
       }) 
  }

}
