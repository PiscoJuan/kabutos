import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  baseUrl :string= "https://cabutoshop.pythonanywhere.com/movil/";

  
  constructor(
    private http: HttpClient
  	) { }

  getHistorial(id: string){
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    let parametro= new HttpParams().set('cliente',id);
    return this.http.get(this.baseUrl+'historial/',{params:parametro, 'headers':headers})            
  }
  getPedido(id: string){
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    let parametro= new HttpParams().set('id',id);
    return this.http.get(this.baseUrl+'historial/',{params:parametro,'headers':headers});
  }
  nuevoPedido(info):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(info);
    return this.http.post(this.baseUrl+'guardarPedido2/',body,{'headers':headers})
  }
  cancelarPedido(info):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(info);
    return this.http.post(this.baseUrl+'cancelarPedido2/',body,{'headers':headers})
  }

  pagarPedido(info):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(info);
    return this.http.post(this.baseUrl+'pagarPedido/',body,{'headers':headers})
  }
  getCalificacion(id){
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    let parametro= new HttpParams().set('id',id);
    return this.http.get(this.baseUrl+'calificarPedido/',{params:parametro,'headers':headers});
  }
  calificarPedido(info):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(info);
    return this.http.post(this.baseUrl+'calificarPedido/',body,{'headers':headers})
  }
  eliminarCarrito(info):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(info);
    return this.http.post(this.baseUrl+'eliminarCarrito/',body,{'headers':headers})
  }

  crearTarjetaRegaloMonto(infoTarjeta):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(infoTarjeta);
    return this.http.post(this.baseUrl+'crearTarjetaRegaloMonto/',infoTarjeta,{'headers': headers});
  }

  crearTarjetaRegaloproducto(infoTarjeta):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(infoTarjeta);
    return this.http.post(this.baseUrl+'crearTarjetaRegaloproducto/',infoTarjeta,{'headers': headers});
  }
  
  addToken(info):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(info);
    return this.http.post(this.baseUrl+'addToken/',info,{'headers': headers});
  }
}
