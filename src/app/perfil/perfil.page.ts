import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CorrectoPage } from '../aviso/correcto/correcto.page';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { finalize } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { PerfilService } from '../servicios/perfil.service';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { login } from 'src/app/global';
import { AppComponent } from '../app.component';
import { CodigounicoPage } from '../codigounico/codigounico.page';
import { BaneoService } from '../servicios/baneo.service';
import { constants } from 'buffer';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  private correo: string = "";
  perfil: any;
  loading: any;
  codigo_unico:any;
  url;
  date = "";
  id;
  colorBack:any = "var(--ion-color-naranja-oscuro)";
  constructor(
    private baneoService: BaneoService,
    private storage: Storage,
    public perfilService: PerfilService,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    private http: HttpClient,
    private router: Router,
    private component: AppComponent,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.colorBack="#000000"
      }
    });
    this.storage.get('id').then((val) => {
      if (val != null) {
        this.id = val;
        this.datos();
      } else {
        this.perfil=null;
        this.mensajeIncorrecto("Inicie sesión", "Debe iniciar sesión para consultar los datos de perfil")
      }
    });

  }
  copiar(codigo){
    console.log("funciona el click",codigo);
    navigator.clipboard.writeText(codigo);
    alert("Copiado al Portapapeles!")
  }

  datos() {
    this.storage.get('perfil').then((val) => {
      let perf=val;
      let id=perf.id;
      console.log(val)
      console.log(id)
      this.perfilService.getCodigo(id).subscribe((data) => {
        console.log("respuesta",data)
        this.codigo_unico=data;
      })
      //console.log(val)
      if (val == null) {
        this.storage.get('correo').then((val) => {
          this.correo = val;
          if (this.correo != null) {
            this.perfilService.getPerfil(this.correo).subscribe(
              data => {
                this.perfil = data[0];
                if (this.perfil.telefono == "NONE") {
                  this.perfil.telefono = "";
                }
                if (this.perfil.direccion == "NONE") {
                  this.perfil.direccion = "";
                }
                this.imageURL()
                if (Object.keys(this.perfil).length === 0) {
                  this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión");
                } else {
                  this.storage.set('perfil', this.perfil);
                  console.log("se guardo el perfil");
                }

              },
              err => {
                this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión");
              }
            );
          } else {
            this.correo = "";
          }

        });
      } else {
        this.perfil = val;
        if (this.perfil.url != undefined) {
          this.url = this.perfil.url;
        } else {
          this.imageURL();
        }
      }
    });
  }

  async mensajeCorrecto(titulo: string, mensaje: string) {
    const modal = await this.modalController.create({
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
    const modal = await this.modalController.create({
      component: IncorrectoPage,
      cssClass: 'IncorrectoProducto',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje
      }
    });
    return await modal.present();
  }

  login_page(){
    this.router.navigateByUrl('/login');
  }
  
  async showLoading2() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading.....'
    });
    await this.loading.present();
  }

  editar() {
    this.router.navigate(['/footer/perfil/editar-perfil']);
  }

  async eliminar_credenciales(){

    
    this.storage.get("perfil").then((dato) => {
      this.baneoService.revisarBan(dato.id).subscribe( async (data:any) => {
        if (data.valid == "OK"){
          this.loading = await this.loadingCtrl.create({
            message: 'Loading.....'
          });
      
          await this.loading.present();
      
          const user = {
            "correo": this.perfil.correo
          }
      
          this.perfilService.eliminar_perfil(user).subscribe(data =>{
            console.log(data)
             if(data.valid == "OK"){
                this.loading.dismiss();
                this.mensajeIncorrecto("Cuenta de usuario eliminada","Cuenta eliminada, debera crear otro usuario");
                this.component.logout();
             } else {
              this.mensajeIncorrecto("Error","La cuenta no ha sido eliminada");
              this.loading.dismiss();
      
              
             }
          });
        } else {
          this.mensajeIncorrecto("Cuenta bloqueada", "Su cuenta ha sido bloqueada, por favor comuníquese con el establecimiento");
        }
      })
    })

    
  }
  
  async cambiarContra(){

    this.router.navigate(['/footer/cambiar-contra']);

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
        this.url=result
        this.perfil.url=result
        this.storage.set("perfil", this.perfil)
      })
  }
  
  mostrarModal(codigo, url){
    
    console.log("funciona el click",url);
    navigator.clipboard.writeText(codigo);
    let m_usuario=this.perfil.nombre+" "+this.perfil.apellido
    this.mostrarCodigoUnico(m_usuario,codigo, url);
  }

  async mostrarCodigoUnico(titulo: string, mensaje: string, url: string) {
    const modal = await this.modalController.create({
      component: CodigounicoPage,
      cssClass: 'IncorrectoProducto',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje,
        'url': url
      }
    });
    return await modal.present();
  }

  showLoadingOut() {

        this.storage.get("perfil").then((dato) => {
      this.baneoService.revisarBan(dato.id).subscribe((data:any) => {
        if (data.valid == "OK"){
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
        } else {
          this.mensajeIncorrecto("Cuenta bloqueada", "Su cuenta ha sido bloqueada, por favor comuníquese con el establecimiento");
        }
      })
    })
  }
  
  logout() {
    this.storage.clear()
      .then(
        data => {
          login.login = false;

          this.router.navigateByUrl('/');
        },
        error => console.error(error)
      );
  }
}
