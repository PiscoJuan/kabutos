import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';

const httpOptions = {
          headers: new HttpHeaders({
                          'Accept': 'application/json, text/plain',

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
export class NotificacionService {
  baseUrl :string= "https://cabutoshop.pythonanywhere.com/movil/";

  constructor(
    private http1: HTTP
  ) { }

  getN() {
    return this.http1.get(this.baseUrl+'notificacion/',{},{})            
  }
}
