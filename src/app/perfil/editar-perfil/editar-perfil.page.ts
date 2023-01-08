import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../servicios/perfil.service';
import { LoadingController } from '@ionic/angular';
import { NavController,ModalController } from '@ionic/angular';
import { IncorrectoPage } from '../../aviso/incorrecto/incorrecto.page';
import { finalize } from 'rxjs/operators';
import { FileUploader} from  'ng2-file-upload';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { login } from 'src/app/global';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';



@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  
  
  public fileUploader: FileUploader = new FileUploader({});
  formData = new FormData();
  perfil: any;
  loading: any;
  imagenUrl;
  file:any;
  constructor(
    private storage: Storage,
    public perfilService: PerfilService,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    
    private navCtrlr: NavController, private router: Router
  ) { 

    this.storage.get('perfil').then((val)=>{
      if(val!=null){
        this.perfil=val;
        if(this.perfil.url != undefined){
          this.imagenUrl=this.perfil.url
        }else{
          this.imageURL()
        }
      }
    });
    
  }

  ngOnInit() {

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      login.perfil=true;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      this.formData.append("file", event.target.files[0], event.target.files[0].name);
      reader.onload = (event) => { 
        var ul = ""
        var buf = this.convert(event.target.result, ul)
        this.imagenUrl = buf;
      }
    }
  }
  public delete() {
    login.perfil=false;
    this.imagenUrl = '';
  }
  convert(buff,buff2){
    for (var i=0, strLen=buff.length; i < strLen; i++) {
      buff2= buff2 + buff[i];
    }
    var buff3 = buff2
    return buff3;
  }

  editar(form){
    var formData: any = new FormData();
    formData.append("id", this.perfil.id);
    formData.append("nombre",this.perfil.nombre);    
    formData.append("apellido",this.perfil.apellido);
    formData.append("cedula",this.perfil.cedula);
    formData.append("telefono",this.perfil.telefono);
    formData.append("direccion",this.perfil.direccion);
    formData.append("fechaNac",this.perfil.fechaNac);
    formData.append("url",this.formData.get("file"))
    this.file = this.formData.get("file")

    if (this.file!= null){
      this.file = this.file.name
    }


    form = form.value;
    if(form.nombre == ''|| form.apellido == '' || form.cedula == '' ){
      this.mensajeIncorrecto("Campos Incompletos","Por favor complete los campos Nombre y Apellido");
      var int_length = form.cedula.length;
    } else if (!this.validarCedula(form.cedula)) {
        this.mensajeIncorrecto("Revisar cédula", "Su cédula no es válida");
    } else if ((int_length < 10 && int_length < 13) || int_length > 13) {
        this.mensajeIncorrecto("Revisar RUC", "Recuerde que si ingresa cédula deben ser  RUC 13 dígitos");
    }
    else{
      let regExp = /^[0-9]{10}$/;
      if (form.telefono != "" && !regExp.test(form.telefono)) {
        this.mensajeIncorrecto("Campo incorrecto","Número de teléfono debe contener 10 números");
      }else{
        console.log(...formData)
        this.editarPerfil(formData);
      }

    }
  }

  async editarPerfil(form: FormData){
    await this.showLoading2();
    this.perfilService.editPerfil(form)
    .pipe(
      finalize(async () => {
        await this.loading.dismiss();
      })
    )
    .subscribe(
      data => {
        console.log(data);
        if(data.valid == "ok"){
          if(this.file!= null){
            console.log("file dentro",this.file)
            this.file = "/media/"+this.file
          }
          else {
            this.file = this.perfil.imagen
          }

          this.perfil.url =this.file
          this.perfil.url =  "https://cabutoshop.pythonanywhere.com" + this.perfil.url
          console.log(this.perfil.url)
          this.perfil.imagen=this.file
          console.log("perfil", this.perfil)
          this.storage.set('perfil',this.perfil);
        }else{
          this.mensajeIncorrecto("Error","No se han guardado los datos modificados");
        }
        this.atras()
      },
      err => {
        this.mensajeIncorrecto("Algo Salio mal", "Fallo en la conexión")
      }
    );
  }

  async mensajeIncorrecto(titulo:string,mensaje:string){
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
        this.imagenUrl=result
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

  validarCedula(cedula: string) {
    // Créditos: Victor Diaz De La Gasca.
    // Autor: Adrián Egüez
    console.log(cedula)
    if (cedula.length === 10) {
      const digitoRegion = cedula.substring(0, 2);
      console.log(digitoRegion)
      if (Number(digitoRegion) >= 1 && Number(digitoRegion) <= 24) {
        const ultimoDigito = Number(cedula.substring(9, 10));
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }
  
        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }
  
        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }
  
        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }
  
        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }
        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
        const sumaTotal = (pares + impares);
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);
        const decena = (Number(primerDigitoSuma) + 1) * 10;
        console.log(decena)
        let digitoValidador = decena - sumaTotal;
        console.log(digitoValidador)
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }
        console.log(digitoValidador)
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }
  
      } else {
        return false;
      }
    } else {
      return false;
    }
  
  }
}
