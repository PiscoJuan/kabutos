import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PremiosService {
  
  baseUrl :string= "https://cabutoshop.pythonanywhere.com/movil/";
  constructor(
    private http: HttpClient
  ) { }

  getPremios() {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl + 'premios/', {headers: headers})
  }

  getPremiosPersonales(id:number){
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl + 'misPremios/'+id, {headers: headers})
  }

  getPuntos(id:number){
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl + 'misPuntos/'+id, {headers: headers})
  }

  getPremiosUtlizados(id:number){
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl + 'getPremiosUtlizados/'+id, {headers: headers})
  }

  reclamarPremio(data):Observable<any> {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(data);
    return this.http.post(this.baseUrl+'reclamarPremio/',body,{'headers':headers})            
  }

  restarPuntos(data):Observable<any> {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(data);
    return this.http.post(this.baseUrl+'restarPuntos/',body,{'headers':headers})            
  }
}
