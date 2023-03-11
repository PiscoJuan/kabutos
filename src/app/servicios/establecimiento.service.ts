import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {
  baseUrl :string= "https://cabutoshop.pythonanywhere.com/movil/";

  constructor(
    private http: HttpClient
  	) { }

  getEstablecimiento() {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'establecimiento/',{'headers':headers})            
  }
 
  getEstablecimientoBuscar(filtro: string){
    let parametro= new HttpParams().set('nombre',filtro);
    const httpOptions = {
          headers: new HttpHeaders({
              'Accept': 'application/json, text/plain',
              'Content-Type':  'application/json',
            })
         };
        return this.http.get(this.baseUrl+'establecimiento/',{params:parametro, headers:httpOptions.headers});
  }

  getEstablecimientoId(filtro: string){
    let parametro= new HttpParams().set('id',filtro);
    const httpOptions = {
          headers: new HttpHeaders({
              'Accept': 'application/json, text/plain',
              'Content-Type':  'application/json',
            })
         };
        return this.http.get(this.baseUrl+'establecimiento/',{params:parametro, headers:httpOptions.headers});
  }
}
