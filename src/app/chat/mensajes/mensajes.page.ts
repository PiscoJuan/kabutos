import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
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

  constructor(
    private navCtrl:NavController,
    private storage: Storage,
    private mensajeriaService:MensajeriaService

    ) { }

  ngOnInit() {
    this.mensajeriaService.obtenerAdmin()
    console.log(this.storage.get("perfil").then(data=>{
      console.log(data.cedula)
      this.cliente=data.cedula
      this.mensajeriaService.usuario_cliente=data.cedula
      this.mensajeriaService.obtenerListaMensajes(this.content)
  
    }))
  }


  ionViewDidEnter(){
    this.mensajeriaService.obtenerAdmin()
    this.mensajeriaService.obtenerListaMensajes(this.content)
  }

  sendMessage() {
    //console.log(this.mensajeriaService.contactosMensajes)
    if (this.textSms.length > 0) {
      console.log(this.storage.get("perfil").then(data=>{
        console.log(data)
        data={
          cliente:this.cliente,
          admin:this.admin,
          texto:this.textSms
        }
        this.mensajeriaService.sendMessage(data,this.content)
        //this.scrollToBottom()
        //this.mensajeriaService.enviar()
        this.textSms = "";
      }))
      
    }
  }

  regresar(){
    this.navCtrl.back()
  }


  manejarAdmin(event){
    console.log("manejar admin")
    this.admin=event.detail.value.cedula
    console.log(this.admin)
    console.log(event.detail.value)
    this.mensajeriaService.usuario_admin=event.detail.value.cedula
    //document.getElementById('mensajes').innerHTML = '';
    this.mensajeriaService.contactosMensajes=[]
    this.mensajeriaService.obtenerListaMensajes(this.content)

  }
  
}
