import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../servicios/auth.service';
import { ModalController, LoadingController, NavController } from '@ionic/angular';
import { FileUploader } from 'ng2-file-upload';
import { login } from '../../../global'
import { Storage } from '@ionic/storage';
import { AppComponent } from '../../../app.component'
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { FcmService } from 'src/app/servicios/fcm.service';
import { PerfilService } from 'src/app/servicios/perfil.service';
import { CorrectoPage } from '../../../aviso/correcto/correcto.page';
import { IncorrectoPage } from '../../../aviso/incorrecto/incorrecto.page';
import { PoliticasPage } from 'src/app/politicas/politicas.page';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
import { HistorialService } from "../../../servicios/historial.service";
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { FCM } from "@capacitor-community/fcm";
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})


export class RegistroPage implements OnInit {

  public fileUploader: FileUploader = new FileUploader({});
  formData = new FormData();
  url = '';
  x = '';
  perfil;
  public type = "password";
  passwordToggleIcon = 'eye';
  public showPass = false;
  constructor(private authService: AuthService, private router: Router, private loading: LoadingController,
    private navCtrlr: NavController,
    public modalCtrl: ModalController,
    private fcm: FcmService,
    private firebase: FirebaseX,
    private perfilService: PerfilService,
    private storage: Storage,
    private HistorialService: HistorialService,
    private component: AppComponent,) { }

  ngOnInit() {

  }

  register(form) {
    form = form.value
    console.log(form)
    console.log(form.confirmar)
    console.log(form.contrasena)
    var contra = form.contrasena;
    var conf = form.confirmar
    var cedula = form.cedula
    console.log(typeof (cedula));
    console.log(cedula);
    console.log(this.formData.getAll('file'));
    console.log(isNaN(cedula));
    const foto = {
      'url': this.formData.getAll('file')
    }
    const formR = {
      'cedula': form.cedula,
      'nombre': form.nombre,
      'apellido': form.apellido,
      'email': form.email,
      'contrasena': form.contrasena,
      'confirmar': form.confirmar,
      'telefono': form.telefono
    }
    console.log(formR)
    if (form.cedula == '' || form.nombre == '' || form.apellido == '' || form.correo == "" || form.contrasena == "" || form.confirmar == "" || form.telefono == "") {
      this.mensajeIncorrecto("Campos Incompletos", "Por favor complete los campos");
    } else {
      if (isNaN(cedula) == false) {
        var int_length = cedula.length;
        console.log(int_length);
        if (!this.validarCedula(cedula)) {
          this.mensajeIncorrecto("Revisar cédula", "Su cédula no es válida");
        } else if ((int_length < 10 && int_length < 13) || int_length > 13) {
          this.mensajeIncorrecto("Revisar RUC", "Recuerde que si ingresa cédula deben ser  RUC 13 dígitos");
        } else if (this.validarEmail(form.email) == false) {
          this.mensajeIncorrecto("Revisar correo", "Escriba de su correo de manera correcta");
        } else if (contra != conf) {
          this.mensajeIncorrecto("Registro Fallido", "Las contraseñas no coinciden, verifique que las contraseñas sean iguales");
        } else if (!this.validarTelefono(form.telefono)) {
          this.mensajeIncorrecto("Registro Fallido", "El numero de teléfono no es válido");
        }
        console.log("voy a comparar");
        console.log(this.isEqual(form.nombre, form.apellido));

        if (contra == conf && (this.validarCedula(cedula) || int_length == 13) && this.validarEmail(form.email) && this.validarTelefono(form.telefono)) {
          if (isNaN(form.nombre) && isNaN(form.apellido)) {
            console.log("voy a comparar");
            console.log(this.isEqual(form.nombre, form.apellido));
            if (this.isEqual(form.nombre, form.apellido)) {
              this.mensajeIncorrecto("Registro Fallido", "El nombre y apellido registrado son iguales");
            } else {
              this.showLoading(formR)
            }
          } else {
            this.mensajeIncorrecto("Registro Fallido", "Por favor ingrese un nombre y apellido de manera  correcta");
          }
        }
      } else {
        this.mensajeIncorrecto("Ruc/Cédula ", "Su Cédula debe contener solo numeros");
      }
    }
  }

  regresar() {
    let animations: AnimationOptions = {
      animated: true,
      animationDirection: "back"
    }
    this.navCtrlr.back(animations)
  }


  registroR(formR) {
    this.authService.addUser(formR).subscribe(data => {
      console.log("imprimiendo data", data, formR)
      if (data.valid == "OK") {
        this.mensajeCorrecto("Registro exitoso", "");
        var nombre = data.nombre;
        var apellido = data.apellido;
        var id = data.id;
        console.log(nombre)
        console.log(apellido)
        login.login = true;
        this.storage.set('id', id);
        this.storage.set('name', nombre);
        this.storage.set('apellido', apellido);
        this.storage.set('correo', formR.email);
        this.storage.set('number', "");
        this.storage.set('telefono', formR.telefono);
        this.component.name = nombre;
        this.component.lastname = apellido;
        this.component.action = "Cerrar Sesión";
        this.perfilS(formR.email)

        PushNotifications.addListener('registration',
          (token: Token) => {
            console.log('The token is: ' + token.value)
            this.storage.set('token', token.value);
            let info = {
              id: id,
              token: token.value
            };
            console.log("infoToken es:", info);
            this.HistorialService.addToken(info).subscribe(
              (data) => {
                if (data.valid == "Ok") {
                  console.log("Token anadido");
                } else {
                  console.log("Error al anadir token");
                }
              },
              (err) => {
                console.log("Error 2 al anadir token");
              }
            );
          });
        this.firebase.getToken().then(token => {
          var registro = {
            usuario: id,
            token: token
          }
          console.log(registro);
          this.fcm.registrarUsuario(registro).subscribe(data => {
            console.log(data.valid);
          });
        });
        console.log(login)
        if (login.categoria == true) {
          this.router.navigateByUrl('/footer/categorias/detalle-categoria');
        } else if (login.oferta == true && (login.producto = false)) {
          this.router.navigateByUrl('/footer/ofertas');
        } else if (login.producto == true) {
          this.router.navigateByUrl('/footer/producto');
        } else {
          this.router.navigateByUrl('/');
        }
      } else if (data.valid == 'CED') {
        this.mensajeIncorrecto("Error", "La cédula ya se encuentra registrada");
        this.router.navigateByUrl('/registro');
      } else if (data.valid == 'EMAIL') {
        this.mensajeIncorrecto("Error", "El correo ya se encuentra registrado");
        this.router.navigateByUrl('/registro');
      }
      else {
        this.mensajeIncorrecto("Error", "Ha ocurrido un error, intentar de nuevo");
        this.router.navigateByUrl('/registro');
      }

    })
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

  perfilS(correo) {
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

  imageURL(): any {
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
      this.component.image = result
      this.perfil.url = result
      this.storage.set("perfil", this.perfil)
    })
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log(event.target.files)
      console.log(event.target.files[0])
      console.log(event.target.files[0].name)
      this.formData.append('file', event.target.files[0]);
      reader.onload = (event) => {
        var ul = ""
        var buf = this.convert(event.target.result, ul)
        this.url = buf;
      }
    }
  }
  public delete() {
    this.url = '';
  }

  uploadPersonaImage(e) {
    console.log(e.target.src)
  }

  convert(buff, buff2) {
    for (var i = 0, strLen = buff.length; i < strLen; i++) {
      buff2 = buff2 + buff[i];
    }
    var buff3 = buff2
    return buff3;
  }

  togglePasswordClick(): void {
    this.showPass = !this.showPass;
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }
  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }


  validarEmail(valor) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(valor) ? true : false;
  }
  validarTelefono(valor) {
    var regex = /^0+[0-9]{9}$/;
    return regex.test(valor) ? true : false;
  }


  isEqual(str1, str2) {
    return str1.toUpperCase() === str2.toUpperCase()
  }

  showLoading(form) {
    this.loading.create({
      message: 'Loading.....'
    }).then((loading) => {
      loading.present(); {
        this.registroR(form);
      }
      setTimeout(() => {
        loading.dismiss();
      }, 2000);
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

  async politicas() {
    const modal = await this.modalCtrl.create({
      component: PoliticasPage,
      cssClass: 'Politicas',
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



//https://stackblitz.com/edit/angular-file-upload-preview-85v9bg