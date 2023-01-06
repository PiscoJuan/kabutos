import { Component, OnInit} from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../../servicios/auth.service';
import { FcmService } from 'src/app/servicios/fcm.service';
import { LoadingController } from '@ionic/angular';
import { AlertController, NavController,ToastController,Platform, ModalController } from '@ionic/angular';
import {ModalPage} from './../../../modal/modal.page';
import {login} from  '../../../global'
import { Storage } from '@ionic/storage';
import {AppComponent} from  '../../../app.component'
import {FooterPage} from 'src/app/footer/footer.page'
import {CorrectoPage} from '../../../aviso/correcto/correcto.page';
import {IncorrectoPage} from '../../../aviso/incorrecto/incorrecto.page';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { PerfilService } from 'src/app/servicios/perfil.service';
import { ShoppingCartService } from 'src/app/servicios/shopping-cart.service';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
import { FCM } from "@capacitor-community/fcm"; 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {

  loading: any;
	validacion : {};
  public alertShown: boolean = false;
  picture:string ;
  name:string;
  email:string;
  perfil;
  isLoggedIn: boolean = false
  user: any
  public type = "password"; 
  passwordToggleIcon = 'eye';
  public showPass = false; 
  constructor(
    private  authService:  AuthService, 
    private  router:  Router, 
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private toast: ToastController,
    private navCtrlr: NavController,
    private platform: Platform,
    public modalCtrl: ModalController,
    private storage: Storage,
    private component: AppComponent,
    private footer: FooterPage,
    private fcm: FcmService,
    private firebase: FirebaseX,
    private perfilService: PerfilService,
    private shoppingService: ShoppingCartService) { }
	
  ngOnInit() {
  }

  async contrasena(){
    //let modal = this.modalCtrl.create(ModalPage);
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'custom-modal'
    });
    return await modal.present();
  }
  
  verificar(form){
	form = form.value
	console.log(form)
  console.log(form.correo)
  console.log(form.contrasena)
	if(form.correo == "" || form.contrasena == "" ){
    //this.mensaje("Campos Incompletos","Revisar los campos","Por favor complete los campos");
    this.mensajeIncorrecto("Campos Incompletos","Por favor complete los campos");
  }else{
    this.show(form)
  }
  }

  async verificarB(form){

    this.loading = await this.loadingCtrl.create({
      message: 'Loading.....'
    });

    await this.loading.present();

    this.authService.VerificarUser(form).subscribe(data=> {
      console.log(data.valid)
      if (data.valid == "OK"){
        let info = {
          'correo': form.correo,
          'contrasena': 'xxxxx'
        };

        FCM.subscribeTo({ topic: "pruebaLogin" }) 
          .then((r) => {}) 
          .catch((err) => console.log(err)); 

        this.shoppingService.showCart(info)
          .subscribe(data => {
            console.log(data)
            if (data.hasOwnProperty(0)) {
              this.footer.cosas=data[0].total
              this.storage.set('cosas', this.footer.cosas);
            }else{
              this.footer.cosas=data.total
              this.storage.set('cosas', this.footer.cosas)
            }

          }, (error) => {
            this.loading.dismiss();
            console.error(error);
          });    
        //this.router.navigateByUrl('/producto');
        var nombre = data.nombre;
        var apellido = data.apellido;
        var id = data.id;
        console.log(nombre)
        console.log(apellido)
        login.login = true;
        this.storage.set('id', id);
        this.storage.set('name', nombre);
        this.storage.set('apellido', apellido);
        this.storage.set('correo', form.correo);
        this.storage.set('number', "");
        this.component.name=nombre;
        this.component.lastname = apellido;
        this.component.action="Cerrar Sesión";
        this.perfilS(form.correo);

        this.firebase.getToken().then(token => {
          var registro={
            usuario : id,
            token : token
          }
          console.log(registro);
          this.fcm.registrarUsuario(registro).subscribe(data=> {
          console.log(data.valid);
          });
        });
        console.log(login);

        this.loading.dismiss();

        if(login.categoria == true){
          this.router.navigateByUrl('/footer/categorias/detalle-categoria');
        }else if(login.oferta == true && (login.producto =false)){
          this.router.navigateByUrl('/footer/ofertas');
        }else if (login.producto == true){
          this.router.navigateByUrl('/footer/producto');
        }else{
          this.router.navigateByUrl('/');
        }
      }
      else{
        this.loading.dismiss();
        //this.mensaje("Acceso Incorrecto","Algo salió mal","Su correo o contraseña están incorrectos");
        this.mensajeIncorrecto("Acceso Incorrecto","Algo salió mal su correo o contraseña están incorrectos");
        this.router.navigateByUrl('/login');
      }
      
      })
  }

  perfilS(correo){
    this.perfilService.getPerfil(correo).subscribe(
      data => {
        this.perfil = data[0];
        console.log(data);
        if (this.perfil.telefono == "NONE") {
          this.perfil.telefono = "";
        }
        if (this.perfil.direccion == "NONE") {
          this.perfil.direccion = "";
        }
        this.imageURL()
        if (Object.keys(this.perfil).length === 0) {
          this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
        } else {
          this.storage.set('perfil', this.perfil);
          console.log("se guardo el perfil")
        }

      },
      err => {
        this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
      }
    );
  }

  imageURL():any {
    const getImageOrFallback = (path, fallback) => {
      return new Promise(resolve => {
        const img = new Image();
        img.src = path;
        img.onload = () => resolve(path);
        img.onerror = () => resolve(fallback);
      });
    };
    getImageOrFallback(
      "http://cabutoshop.pythonanywhere.com" + this.perfil.imagen,
      "../assets/img/avatar_perfil2.png"
      ).then(result => {
        this.component.image=result
        this.perfil.url=result
        this.storage.set("perfil", this.perfil)
      })
  }

  atras(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.navCtrlr.back(animations)
  }

  async forgotPass() {
    const forgot = await this.alert.create({
      cssClass: 'Forgot Password?',
      header:'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler:  data => {
            console.log('Send clicked');
             this.presentToast();

          }
        }
      ]
    });
    forgot.present();
  }


async presentToast() {
    const toast = await this.toast.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              /*closeButtonText: 'OK',
              showCloseButton: true*/
    });
    toast.present();
  }


async mensaje(titulo:string,subtitulo:string,mensaje:string) {
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

    togglePasswordClick():void{
      this.showPass=!this.showPass;   
      if(this.passwordToggleIcon == 'eye'){
        this.passwordToggleIcon = 'eye-off';
      }else{
        this.passwordToggleIcon = 'eye';
      }
    }
    showPassword() {
      this.showPass = !this.showPass;
            if(this.showPass){
                this.type = "text";
                 } else {
           this.type = "password";
         }
       } 


       showLoading(form) {  
        this.loadingCtrl.create({  
          message: 'Loading.....'   
          }).then((loading) => {  
           loading.present();{
            this.verificar(form);
          } 
           setTimeout(() => {   
             loading.dismiss();  
           }, 2000 );   
          });  
        }

        showLoadingC() {  
          this.loadingCtrl.create({  
            message: 'Loading.....'   
            }).then((loading) => {  
             loading.present();{
              this.contrasena();
            } 
             setTimeout(() => {   
               loading.dismiss();  
             }, 1000 );   
            });  
          }


            showLoadingR() {  
              this.loadingCtrl.create({  
                message: 'Loading.....'   
                }).then((loading) => {  
                 loading.present();{
                  this.router.navigateByUrl('/registro');
                } 
                 setTimeout(() => {   
                   loading.dismiss();  
                 }, 1000 );   
                });  
              }

              
  show(form){
    this.loadingCtrl.create({
      message: 'Loading.....'
    }).then((loading) => {
      loading.present();{
        this.verificarB(form);
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





