import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetasDeRegaloService {
  
  //baseUrl :string= "http://127.0.0.1:8000/movil/";
  baseUrl :string= "https://cabutoshop.pythonanywhere.com/movil/";
  
  constructor(
    private http: HttpClient) { }
    
    getTarjetasRegalo(id: number) {
      const headers = {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      }
      return this.http.get(this.baseUrl+'tarjetasRegalo/'+ id,{'headers':headers})            
    }
    getTarjetasRegaloP(id: number) {
      const headers = {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      }
      return this.http.get(this.baseUrl+'tarjetasRegaloP/'+ id,{'headers':headers})            
    }
  
}
