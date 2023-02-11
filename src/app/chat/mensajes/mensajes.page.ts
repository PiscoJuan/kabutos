import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { interval } from 'rxjs';
import { MensajeriaService } from 'src/app/servicios/mensajeria.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  textSms = "";
  cliente:string
  admin: any;
  admin_seleccionado:string
  tiene_mensajes:boolean=false

  interval
  constructor(
    private navCtrl:NavController,
    private storage: Storage,
    private mensajeriaService:MensajeriaService

    ) { }

  ngOnInit() {
    this.mensajeriaService.obtenerAdmin()
    console.log(this.storage.get("perfil").then(data=>{
      this.cliente=data.cedula
      this.mensajeriaService.usuario_cliente=data.cedula
      this.mensajeriaService.obtenerListaMensajes(this.content)
    }))

    this.interval = setInterval(() => {
      this.mensajeriaService.obtenerListaMensajes(this.content)
      this.tiene_mensajes=true
      }, 2000); 

   
  }
  ionViewWillLeave(){
    clearInterval(this.interval);

}
  
  ionViewDidEnter(){
    this.mensajeriaService.obtenerAdmin()
    this.mensajeriaService.obtenerListaMensajes(this.content)
    this.admin_seleccionado=this.mensajeriaService.usuarios_admin[0].nombre+" "+this.mensajeriaService.usuarios_admin[0].apellido

  }


  

  sendMessage() {
    if (this.textSms.length > 0) {
      console.log(this.storage.get("perfil").then(data=>{
        data={
          cliente:this.cliente,
          admin:this.admin,
          texto:this.textSms
        }
        this.mensajeriaService.sendMessage(data,this.content)

        this.textSms = "";
      }))
      
    }
  }

  regresar(){
    this.navCtrl.back()
  }

  manejarAdmin(event){

    this.admin=event.detail.value.cedula
    this.mensajeriaService.usuario_admin=event.detail.value.cedula
    //this.mensajeriaService.contactosMensajes=[]
    this.mensajeriaService.obtenerListaMensajes(this.content)
    this.mensajeriaService.marcar_leido()

  }
  
}
