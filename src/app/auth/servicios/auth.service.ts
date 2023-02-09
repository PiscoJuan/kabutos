import { NgModule } from '@angular/core';
import { Injectable } from  '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { User } from  './user';
import { Auth } from  './auth';
//import { Correo } from  './correo';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase/app';

const httpOptions = {
  
    "Accept": "application/json, text/plain",
      "Content-Type": "application/json", 
      "cache-control": "no-cache", 
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers",
      "Access-Control-Allow-Credentials" : "true",
      "Access-Control-Allow-Methods" : "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT",  
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	/*AUTH_SERVER_ADDRESS:  string  =  'http://127.0.0.1:8000'; cabutoshop.pythonanywhere.com/movil/login*/

  AUTH_SERVER_ADDRESS:  string  =  'http://127.0.0.1:8000/movil';
  //AUTH_SERVER_ADDRESS:  string  =  'http://cabutoshop.pythonanywhere.com/movil';

  baseUrl :string= "http://127.0.0.1:8000/movil/";
  //baseUrl :string= "http://cabutoshop.pythonanywhere.com/movil/";

  constructor(private  httpClient:  HttpClient, private AFauth: AngularFireAuth, private db: AngularFirestore,
              private fb: Facebook ) { }

  addUser(user:User):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    console.log("sin transformar")
    console.log(user)
    const body = JSON.stringify(user);
    console.log("Transformar")
    console.log(body)
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/registro2/`,user)
  }

  VerificarUser(auth:Auth):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(auth);
    console.log(body)
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login/`,body,{'headers':headers})
  }

  enviarCorreo(correo:String):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }

    const body = JSON.stringify(correo);
    console.log(body)
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/cambioContra/`,body,{'headers':headers})
  }

  getUser(auth:Auth):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
    }
    console.log("sin transformar")
    console.log(auth)
    const body = JSON.stringify(auth);
    console.log("Transformar")
    console.log(body)
    return this.httpClient.post(this.baseUrl+'carrito/',auth,{'headers':httpOptions})  
  }

}
  