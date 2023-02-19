import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../servicios/perfil.service';
import { LoadingController } from '@ionic/angular';
import { NavController,ModalController } from '@ionic/angular';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { FileUploader} from  'ng2-file-upload';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
import { CorrectoPage } from '../aviso/correcto/correcto.page';

@Component({
  selector: 'app-cambiar-contra',
  templateUrl: './cambiar-contra.page.html',
  styleUrls: ['./cambiar-contra.page.scss'],
})
export class CambiarContraPage implements OnInit {
  public showPass = false;
  public showPass2 = false; 
  public fileUploader: FileUploader = new FileUploader({});
  formData = new FormData();
  passwordToggleIcon = 'eye';
  passwordToggleIcon2 = 'eye';

  perfil: any;
  loading: any;
  imagenUrl;
  file:any;
  colorBack:any = "var(--ion-color-naranja-oscuro)";
  imagenedit:any = "../assets/img/editar-imagen.png";
  butAtras:any = "../assets/img/atras_naranja.png";
  constructor(
    private storage: Storage,
    public perfilService: PerfilService,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    private navCtrlr: NavController, private router: Router) { 
      this.storage.get('perfil').then((val)=>{
        if(val!=null){
          this.perfil=val;
          if(this.perfil.url != undefined){
            this.imagenUrl=this.perfil.url
          }
        }
      });
    
    }

  ngOnInit() {
    this.storage.get("elegirEstab").then((val) => {
      if(Number(val) == 2){
        this.colorBack="#000000"
        this.imagenedit = "../assets/img/editar-imagenblack.png";
        this.butAtras= "../assets/img/atras_negro.png"
      }
    });
  }

  editar(form){
    form = form.value;
    console.log(form)
    if(form.nueva == ''|| form.actual == '' || form.conf == ''){
      this.mensajeIncorrecto("Campos Incompletos","Por favor complete todos los campos");
    } 
    else if (form.conf != form.nueva) {
      this.mensajeIncorrecto("Confirmación fallida","La confirmación es diferente a la nueva contraseña");

    }
    else{
      this.cambiarContra(form);
    }
  }
  async cambiarContra(form){

    this.loading = await this.loadingCtrl.create({
      message: 'Loading.....'
    });

    await this.loading.present();
    this.storage.get('id').then((val) => {
      if (val != null) {
        let iid = val;
        let value = {
          id: iid,
          vContra: form.actual,
          nContra: form.nueva,
        }
        this.perfilService.cambiarContra(value).subscribe(data =>{
          if(data.valid == "OK") {
            this.loading.dismiss();
            this.mensajeCorrecto("Cambio exitoso","Su contraseña ha sido cambiada exitosamente");
            //this.component.logout();
            this.atras()
         }
         else if (data.valid == "contra") {
          this.loading.dismiss();
          this.mensajeIncorrecto("Contraseña incorrecta", "Su contraseña actual no es la correcta");
         }
         else if (data.valid == "NO") {
          this.loading.dismiss();
          this.mensajeIncorrecto("Error", "Su contraseña no pudo ser cambiada");
         }
        });
      }});
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

  async showLoading2() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading.....'
    });
    await this.loading.present();
  }

  atras(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.navCtrlr.back(animations)
  }

  togglePasswordClick(): void {
    this.showPass = !this.showPass;
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  togglePasswordClick2(): void {
    this.showPass2 = !this.showPass2;
    if (this.passwordToggleIcon2 == 'eye') {
      this.passwordToggleIcon2 = 'eye-off';
    } else {
      this.passwordToggleIcon2 = 'eye';
    }
  }
}
