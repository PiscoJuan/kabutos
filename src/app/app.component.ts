import { Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { login } from '././global';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { DetalleNotificacionPage } from './notificacion/detalle-notificacion/detalle-notificacion.page';
import { CorrectoPage } from './aviso/correcto/correcto.page';
import { IncorrectoPage } from './aviso/incorrecto/incorrecto.page';
import { IonContent } from '@ionic/angular';
import { FooterPage } from 'src/app/footer/footer.page'
import { FcmService } from './servicios/fcm.service';

declare var window;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  inicio = login.login
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private fcm: FcmService,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private firebase: FirebaseX,
    private footer: FooterPage
  ) {
    this.initializeApp();
  }


  @ViewChild('navChild') private content: IonContent;
  closingNavCallback() {
    this.content.scrollToTop();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getStorage();
      this.getImage();
      this.cargarBtn();
      this.firebase.getToken().then(token => {
        var id = -1
        this.storage.get('id').then((val) => {
          if (val != null) {
            id = val;
          }
          var registro = {
            usuario: id,
            token: token
          }

          this.fcm.registrarUsuario(registro).subscribe(data => {
            console.log(data.valid);
          });
        });
      });
      this.firebase.onMessageReceived().subscribe(data => {

        if (data.messageType === "notification") {
          if (data.tap) {
            if (data.id) {

              let navigationExtras: NavigationExtras = {
                state: {
                  id: data.id,
                }
              };
              this.router.navigate(['/footer/historial/detalle-historial'], navigationExtras);
            } 
            if (data.image) {
              this.notificacion(data.titulo, data.mensaje, data.image);
            } else {
              this.notificacion(data.titulo, data.mensaje, "");
            }
          } else {
            window.footer.datos();
          }

        }
      }, function (error) {
        console.error(error);
      });

    });
  }

  public name: String = "";
  public lastname: String = "";
  private fullname: String = "";
  public image;

  getStorage() {
    console.log(login.login)
    this.storage.get('name').then((val) => {
      if (val == null) {
        this.name = "";
      } else {
        this.name = val.toUpperCase();
        console.log('name: ', this.name.toUpperCase());
        this.storage.get('apellido').then((val) => {
          if (val == null) {
            this.lastname = "";
          } else {
            this.lastname = val.toUpperCase();
            console.log('apellido: ', this.lastname.toUpperCase());
            console.log(this.fullname.toUpperCase())
          }
        });
      }
    });
  }


  getImage() {
    this.storage.get('perfil').then((val) => {

      if (val != null) {
        if (val.url != undefined) {
          this.image = val.url
        } else {
          this.image = "../assets/img/avatar.png";
        }
      }
    });
  }

  public action: String = " ";

  initOrOut() {
    this.storage.get('name').then((nombre) => {
      if (this.action == "Iniciar Sesión") {
        this.showLoadingIn();
        //this.action="Iniciar Sesión";
      } else {
        this.showLoadingOut();
        //this.action="Cerrar Sesión";
      }
    });
  }

  cargarBtn() {

    this.storage.get('name').then((nombre) => {

      if (login.login == false && nombre == null) {
        //this.showLoadingOut();
        this.action = "Iniciar Sesión";
      } else {
        //this.showLoadingIn();
        this.action = "Cerrar Sesión";
      }
    });
  }


  logout() {
    this.storage.clear()
      .then(
        data => {
          login.login = false;
          //this.ngOnInit()
          this.name = "";
          this.lastname = "";
          this.footer.cosas = 0
          this.action = "Iniciar Sesión";
          this.image = "../assets/img/avatar.png";
          this.router.navigateByUrl('/');
        },
        error => console.error(error)
      );
  }

  showLoadingOut() {
    this.loadingCtrl.create({
      message: 'Loading.....'
    }).then((loading) => {
      loading.present(); {
        this.logout();
        this.mensajeCorrecto("Cerrar Sesión", "Sesión cerrada exitosamente")
      }
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    });
  }

  showLoadingIn() {
    this.loadingCtrl.create({
      message: 'Loading.....'
    }).then((loading) => {
      loading.present(); {
        this.router.navigateByUrl('/login');
      }
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    });
  }

  perfil() {
    this.storage.get('name').then((nombre) => {
      if (login.login == false && nombre == null) {
        this.router.navigateByUrl('footer/login');
      } else {
        this.router.navigateByUrl('/footer/perfil');
      }
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

  async notificacion(titulo: string, mensaje: string, imagen) {
    const modal = await this.modalCtrl.create({
      component: DetalleNotificacionPage,
      cssClass: 'DetalleNoti',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje,
        'imagen': imagen
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
}
