import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaneoService {

  baseUrl :string= "https://cabutoshop.pythonanywhere.com/movil/";

  constructor(
    private http: HttpClient) { }
    
    revisarBan(id:string) {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'revisarBan/'+id,{headers:headers})            
  }

  revisarVersion(id:number) {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'revisarVersion/'+id,{headers:headers})            
  }
  
}
