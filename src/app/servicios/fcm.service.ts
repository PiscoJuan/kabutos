import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import { Observable, BehaviorSubject } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  baseUrl :string= "http://cabutoshop.pythonanywhere.com/movil/";

  constructor(private http: HttpClient) { }

  registrarUsuario(dispositivo:any):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(dispositivo);
    console.log(body);
    return this.http.post(this.baseUrl+'dispositivo/',body,{'headers':headers})
  }
}
