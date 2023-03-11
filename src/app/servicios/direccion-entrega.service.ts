import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DireccionEntregaService {
  baseUrl :string= "https://cabutoshop.pythonanywhere.com/movil/";

  constructor(
    private http: HttpClient
  ) { }
  
  nuevaDireccion(direccion):Observable<any>{
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(direccion);
    return this.http.post(this.baseUrl+'guardarDireccion/',body,{'headers':headers})
  }

  getDirecciones(id: string){
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    let parametro= new HttpParams().set('cliente',id);
    return this.http.get(this.baseUrl+'direccion/',{params:parametro,headers:headers});

  }
  getDireccion(id: string){
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    let parametro= new HttpParams().set('id',id);
    return this.http.get(this.baseUrl+'direccion/',{params:parametro,headers:headers});

  }
}
