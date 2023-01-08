import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
      "Accept": "application/json, text/plain",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8", 
      "cache-control": "no-cache", 
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers",
      "Access-Control-Allow-Credentials" : "true",
      "Access-Control-Allow-Methods" : "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT",  
    })
 };

@Injectable({
  providedIn: 'root'
})
export class CuponesService {

  baseUrl :string= "https://cabutoshop.pythonanywhere.com/movil/";

  constructor(private http: HttpClient) { }

  getCupon() {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'cupones/',{headers:headers})      
  }

  getCuponesPersonales( id: number) {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'cupones/' + id,{headers:headers})
  }
  
  getCuponesHistorial( id: number) {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'cuponesH/' + id,{headers:headers})
  }

  getDatosCupones( name: string) {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'cuponesDatos/' + name,{headers:headers})
  }
}
