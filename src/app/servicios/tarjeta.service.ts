import { HttpClient, HttpParams } from '@angular/common/http';
import {paymentez} from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  baseUrl :string= "https://ccapi.paymentez.com/v2/";

  constructor(
    private http: HttpClient
  ) { }
  
  nuevaTarjeta(tarjeta):Observable<any>{
    const headers = {
      'Content-Type': 'application/json',
      'Auth-Token': this.authToken(paymentez.app_code_client,paymentez.app_key_client)
    }
    const body = JSON.stringify(tarjeta);
    return this.http.post(this.baseUrl+'card/add/',body,{'headers':headers})
  }


  eliminarTarjeta(tarjeta):Observable<any>{
    const headers = {
      'Content-Type': 'application/json',
      'Auth-Token': this.authToken(paymentez.app_code_server,paymentez.app_key_server)
    }
    const body = JSON.stringify(tarjeta);
    return this.http.post(this.baseUrl+'card/delete/',body,{'headers':headers})
  }

  pagar(tarjeta):Observable<any>{
    const headers = {
      'Content-Type': 'application/json',
      'Auth-Token': this.authToken(paymentez.app_code_server,paymentez.app_key_server)
    }
    const body = JSON.stringify(tarjeta);
    return this.http.post(this.baseUrl+'transaction/debit/',body,{'headers':headers})
  }

  devolver(tarjeta):Observable<any>{
    const headers = {
      'Content-Type': 'application/json',
      'Auth-Token': this.authToken(paymentez.app_code_server,paymentez.app_key_server)
    }
    const body = JSON.stringify(tarjeta);
    return this.http.post(this.baseUrl+'transaction/refund/',body,{'headers':headers})
  }

  getTarjetas(id: string){
    const headers = {
      'Content-Type': 'application/json',
      'Auth-Token': this.authToken(paymentez.app_code_server,paymentez.app_key_server)
    }
    let parametro= new HttpParams().set('uid',id);
    return this.http.get(this.baseUrl+'card/list',{params:parametro,headers:headers});

  }
  authToken(application_code,application_key){
    const unix_timestamp=Math.round(new Date().getTime() / 1000);;
    const uniq_token_string= application_key + unix_timestamp
    const uniq_token_hash = CryptoJS.SHA256(uniq_token_string).toString(CryptoJS.enc.Hex);
    const auth_token = btoa(application_code+";"+unix_timestamp+";"+uniq_token_hash);
    return auth_token;
  }
}
