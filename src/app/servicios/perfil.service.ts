import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarjeta } from '../modelo/tarjeta'


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  //baseUrl :string= "http://127.0.0.1:8000/movil/";
  baseUrl :string= "https://cabutoshop.pythonanywhere.com/movil/";

  constructor(
    private http: HttpClient
  ) { }

  getCodigo(id:string){
    const httpOptions = {
      headers: new HttpHeaders({
          'Accept': 'application/json, text/plain',
          'Content-Type':  'application/json',
        })
      };
    let parametro= new HttpParams().set('id',id);
    console.log(id)
    return this.http.get(this.baseUrl+'getCodigo/',{params:parametro, headers:httpOptions.headers});
  }

  getPerfiles(){
    const httpOptions = {
      headers: new HttpHeaders({
          'Accept': 'application/json, text/plain',
          'Content-Type':  'application/json',
        })
      };
    return this.http.get(this.baseUrl+'cliente2/',{headers:httpOptions.headers});

  }

  getPerfil(correo: string){
    let parametro= new HttpParams().set('correo',correo);
    const httpOptions = {
      headers: new HttpHeaders({
          'Accept': 'application/json, text/plain',
          'Content-Type':  'application/json',
        })
      };
    return this.http.get(this.baseUrl+'cliente/',{params:parametro, headers:httpOptions.headers});

  }

  editPerfil(user):Observable<any>{
    return this.http.post(this.baseUrl+`editarCliente/`,user);
  }

  eliminar_perfil(user):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(user);
    return this.http.post(this.baseUrl+'quitarusuario/',user,{'headers': headers});
  }

  //pruebas de guardado de tarjeta
  //se supone que ya funciona al 100%
  addCredencial(credencial: Tarjeta):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(credencial);
    return this.http.post(this.baseUrl+'tarjeta/add/',credencial,{'headers': headers});
   }

  //en revision
  getCredencial(token: string){
    let parametro= new HttpParams().set('token',token);
    const httpOptions = {
      headers: new HttpHeaders({
          'Accept': 'application/json, text/plain',
          'Content-Type':  'application/json',
        })
      };
   return this.http.get(this.baseUrl+'tarjeta/',{params:parametro, headers:httpOptions.headers});
  }
  //cesar - Te@moStefita0909

  //en revision
  delCredencial(credencial):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(credencial);
    return this.http.post(this.baseUrl+'tarjeta/del/',credencial,{'headers': headers});
  }

}
