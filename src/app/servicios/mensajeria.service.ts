import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { IonContent, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {
  @ViewChild(IonContent) content: IonContent;

  url_base :string= "https://cabutoshop.pythonanywhere.com/movil/";
  //url_base :string= "http://127.0.0.1:8000/movil/";
  //url_base_admins:string="http://127.0.0.1:8000/obtenerAdmin";
  
  usuarios_admin:any=[]
  usuario_cliente:string
  usuario_admin:string
  canal_actual = ""
  contactosMensajes: any[];
  chats: any[]=[];
  
  existen_no_leidos:boolean=false

  constructor(
    private http: HttpClient,
    public platform: Platform,

  ) {

    console.log(this.usuario_cliente)
  }

  obtenerListaMensajes(){

    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    this.http.get<any[]>(this.url_base+"api/chat/" + this.usuario_cliente + "/" + this.usuario_admin+"/",{'headers':headers})
      .subscribe(res => {
        console.log(res)

        let mensajes = res['mensajes']
        this.canal_actual = res['canal']
        
        this.contactosMensajes = mensajes
        //content.scrollToBottom()


      })
  }


  
  sendMessage(data: any,content) {
 

    let sms_info: smsInfo1 = {
      texto: data.texto,
      usuario_cliente: data.cliente,
      usuario_admin: data.admin,
      canal: this.canal_actual,
      check_leido: false,
      esAdmin:false

    }

    const headers = {
      'Accept': 'application/json,application/x-www-form-urlencoded',
      'Content-Type':'application/x-www-form-urlencoded'
    }
    let data_sms = JSON.parse(JSON.stringify(sms_info))
    console.log(sms_info)
    console.log("=============")
    
    this.http.post<any>(this.url_base+"api/chat/"+ this.usuario_cliente + "/" + this.usuario_admin + "/" ,data_sms,{'headers':headers})
      .subscribe(res => {
        
        this.obtenerListaMensajes()
        //this.obtenerMensajesPorUsuarioLogeado()
        //this.scrollToBottom(content)
        this.marcar_leido()

      })
  }
  scrollToBottom(content) {
    content.scrollToBottom(100);
  }

  marcar_leido() {
    this.contactosMensajes.forEach(sms => {
      console.log("marcando leido")
      if(sms.check_leido==false && sms.esAdmin==false){
        this.http.get<any[]>(this.url_base+"sms_update/" + sms.id + "/")
          .subscribe(res => {
            let data = JSON.stringify(res)
          })
      }

    })

  }

   verificar_leidos_todo_admin(){
    this.existen_no_leidos=false

    this.http.get<any[]>(this.url_base+ "obtenerAdmin")
          .subscribe(res => {
            
            //this.usuarios_admin=res['data']
            //this.usuario_admin=this.usuarios_admin[0].cedula
            for (let admin of res['data']) {
              console.log("entro")
              const headers = {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
              }
               this.http.get<any[]>(this.url_base+"api/chat/" + this.usuario_cliente + "/" + admin.cedula+"/",{'headers':headers})
                .subscribe(res => {
          
                  let mensajes = res['mensajes']
                  console.log("ENTRO A VERIFIcar admin")
                  console.log(mensajes)
                  
                  this.existen_no_leidos= this.existen_no_leidos || this.verificar_leidos(mensajes).length>0
                  console.log(this.existen_no_leidos)
                  if(this.existen_no_leidos==true) {
                    console.log("es true")
                    return 
                    
                  }
                })
             
            }

          })
      
  }

  traer_ultimos_chats(){
    let chats=[]
    this.http.get<any[]>(this.url_base+ "obtenerAdmin")
          .subscribe(res => {   
             for (const admin of res['data']) {
              console.log(admin)
              const headers = {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
              }
              this.http.get<any[]>(this.url_base+"api/chat/" + this.usuario_cliente + "/" + admin.cedula+"/",{'headers':headers})
                .subscribe(res => {
          
                  let mensajes = res['mensajes']
                  this.canal_actual = res['canal']
                  console.log(mensajes[mensajes.length-1])
                  console.log(mensajes.length)
                  if(mensajes.length!=0){
                    this.chats.push(mensajes[mensajes.length-1])
                  }
          
                })
            }

          })
          console.log("hola",this.chats)
          //return this.chats
  }

  verificar_leidos(lista){
    let no_leidos=lista.filter(res=>res.check_leido==false && res.esAdmin==false)

    console.log("verificar leido_",no_leidos)
    return no_leidos
   }


  obtenerAdmin(){
    this.http.get<any[]>(this.url_base+ "obtenerAdmin")
          .subscribe(res => {
            let data = JSON.stringify(res)
      
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
  canal: string
  texto: string
  tiempo: string
  usuario: string
  usuario__correo: string
  usuario__rol: number
  receptor: string
  nombre_perfil: string
  check_leido: boolean


}