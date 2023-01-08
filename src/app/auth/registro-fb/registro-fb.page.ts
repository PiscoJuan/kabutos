import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from  "@angular/router";
import { LoadingController } from '@ionic/angular';
import { AlertController, ToastController,Platform } from '@ionic/angular';

@Component({
  selector: 'app-registro-fb',
  templateUrl: './registro-fb.page.html',
  styleUrls: ['./registro-fb.page.scss'],
})
export class RegistroFbPage implements OnInit {
  opcion: string  = '0';
  textInput: string = null;
  verSeleccion: string = '';
  Registro : {};
  RegistroInput: string ='';

  constructor(private  authService:  AuthService,private  router:  Router, private loading: LoadingController,
    private alert: AlertController,
    private toast: ToastController,) { }

  ngOnInit() {
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

  registroFb(){
    this.authService.loginwithFacebook().then(res=>{
      const usuario = res.user;
      var mail = usuario.email;
      var contra = usuario.displayName;
      //this.Registro= this.textInput;
      var int_length = (''+this.RegistroInput).length;
      if(int_length == 10 || int_length == 13){
        const logR ={
          'cedula': this.RegistroInput,
          'email': mail,
          'nombre': contra,
          'apellido': contra,
          'contrasena': contra

        }
        this.authService.addUser(logR).subscribe(data=> {
          console.log("imprimiendo data",data, logR)
          if(data.valid == "OK"){
            this.mensaje("Registro","Registro","Registro exitoso");
            this.router.navigateByUrl('/');
          }else{
            this.mensaje("Error", "Registro","Parece que algo ha ocurrido");
            this.router.navigateByUrl('/login'); 
          }
        console.log(logR);
          })
      }
      
      
      
    }).catch(err =>{
      this.mensaje("Fallo de conexión","algo salio mal","No se pudo Registrar");
    })
  }
}
