import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IonContent, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {
  @ViewChild(IonContent) content: IonContent;

  url_base :string= "http://localhost:8000/movil/";
  //url_base_admins:string="http://127.0.0.1:8000/obtenerAdmin";
  
  usuario_logeado = localStorage.getItem("usuario_logeado")
  usuarios_admin:any=[]
  usuario_cliente:string
  usuario_admin:string
  usuario_receptor: string
  nombre_usuario_receptor = ""
  canal_actual = ""
  chats: smsInfo2[] = [];
  contactosMensajes: smsInfo2[];
  check_leido: ""


  constructor(
    private http: HttpClient,
    public platform: Platform,

  ) {

    console.log(this.usuario_cliente)
  }

  obtenerListaMensajes(content) {
    this.contactosMensajes=[]
    console.log("lista")
    console.log(this.usuario_admin)
    console.log(this.usuario_cliente)
    //console.log(this.url_chat + this.num_servicio_actual + "/" + this.servicio_actual + "/" + this.usuario_receptor + "/" + this.usuario_logeado, "ruta")
    console.log(this.url_base+"api/chat/" + this.usuario_cliente+"/"+ this.usuario_admin +"/")
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    this.http.get<any[]>(this.url_base+"api/chat/" + this.usuario_cliente + "/" + this.usuario_admin+"/",{'headers':headers})
      .subscribe(res => {
        console.log("entro")
        console.log(res)
        console.log(res['canal'])
        let mensajes = res['mensajes']
        this.canal_actual = res['canal']
        
        this.contactosMensajes = mensajes
        content.scrollToBottom()
        console.log(this.canal_actual)

      })
  console.log("fuera de lista")
  }

  sendMessage(data: any,content) {
    //this.marcar_leido()
    

    let sms_info: smsInfo1 = {
      texto: data.texto,
      usuario_cliente: data.cliente,
      usuario_admin: data.admin,
      canal: this.canal_actual,
      check_leido: false,
      esAdmin:false

    }
    console.log(sms_info)
    console.log(data)
    const headers = {
      'Accept': 'application/json,application/x-www-form-urlencoded',
      'Content-Type':'application/x-www-form-urlencoded'
    }
    let data_sms = JSON.parse(JSON.stringify(sms_info))
    this.http.post<any>(this.url_base+"api/chat/" + this.usuario_admin + "/" + this.usuario_cliente + "/",data_sms,{'headers':headers})
      .subscribe(res => {
        
        this.obtenerListaMensajes(content)
        //this.obtenerMensajesPorUsuarioLogeado()
        this.scrollToBottom(content)
        
      })
  }
  scrollToBottom(content) {
    content.scrollToBottom(100);
  }

  marcar_leido() {
    this.contactosMensajes.forEach(sms => {
      if(sms.check_leido==false && sms.usuario__correo!=this.usuario_logeado){
        this.http.get<any[]>(this.url_base+"api/chat/" + "sms_update/" + sms.id + "/")
          .subscribe(res => {
            let data = JSON.stringify(res)
          })
      }

    })

  }


  obtenerAdmin(){
    this.http.get<any[]>(this.url_base+ "obtenerAdmin")
          .subscribe(res => {
            let data = JSON.stringify(res)
            //console.log(data)
            //console.log(res['data'])
            this.usuarios_admin=res['data']
            this.usuario_admin=this.usuarios_admin[0].cedula
            console.log(this.usuario_admin)
          })
  }
 
}

export interface smsInfo1 {
  canal: string
  texto: string
  usuario_cliente: string | null
  usuario_admin: string | null
  check_leido: boolean
  esAdmin:boolean
}
export interface smsInfoCanal {
  CANAL_ID: string
  mensajes: Array<smsInfo2>
  servicio: string
  usuario_canal: Array<any>
}

export interface smsInfo2 {
  id: string
  canal__servicio: string
  texto: string
  tiempo: string
  usuario: string
  usuario__correo: string
  usuario__rol: number
  receptor: string
  nombre_perfil: string
  check_leido: boolean


}