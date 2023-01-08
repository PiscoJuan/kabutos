import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HacerRegaloService {

  //baseUrl :string= "http://127.0.0.1:8000/movil/";
  baseUrl :string= "https://cabutoshop.pythonanywhere.com/movil/";


  constructor(
    private http: HttpClient) { }

    getClienteCorreo(correo): Observable<any> {
      const headers = {
        'Accept': "application/json, text/plain",
        "Content-Type": "application/json"
      }
      const body = JSON.stringify(correo);
      return this.http.post(this.baseUrl + 'clienteCorreo/', body, {'headers':headers})
    }
}
