import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Oferta} from '../modelo/oferta';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
baseUrl :string= "https://cabutoshop.pythonanywhere.com/movil/";

  constructor(
    private http: HttpClient
  	) { }

  getProducto() {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'producto/',{'headers':headers})
  }

  getInicio() {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'inicio/',{'headers':headers})      
  }

  getProductosParciales(page) {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'producto/'+ page,{'headers':headers})
  }
  getInicioBuscar(busqueda) {
    let parametro= new HttpParams().set('nombre',busqueda);
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'inicio/',{'headers':headers,params:parametro})      
  }

  getCategoria() {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'categorias/',{'headers':headers})      
  }

  getProductosCategoria(id) {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'categorias/?id='+id,{'headers':headers})      
  }

  getOferta() {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
   return this.http.get(this.baseUrl+'ofertasData/',{'headers':headers})      
         
     
 }

 addOferta(oferta: Oferta):Observable<any>{
  const headers = {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json'
  }
  return this.http.post(this.baseUrl+'ofertasData/',oferta,{'headers':headers})
 }


  getProductosByFiltro(filtro: String, page: number){
    switch (filtro) {
      case "vendidos":
        return this.http.get(this.baseUrl+'producto/'+page)      
        break;
      case "menor":
      return this.http.get(this.baseUrl+'producto/precioMayor/'+page)      
        break;
      case "mayor":
      return this.http.get(this.baseUrl+'producto/precioMenor/'+page)      
        break;
      case "ascendente":
      return this.http.get(this.baseUrl+'producto/orderAsc/'+page)
        break;
      case "descendente":
      return this.http.get(this.baseUrl+'producto/orderDesc/'+page)      
        break;
      default:
       return this.http.get(this.baseUrl+'producto/')      
        break;
    }
  }



  getProductoBuscar(filtro: string){
    let parametro= new HttpParams().set('nombre',filtro);
    console.log("este es el filtro",filtro);
    console.log(this.baseUrl+'producto/?nombre='+filtro)
    const httpOptions = {
          headers: new HttpHeaders({
              'Accept': 'application/json, text/plain',
              'Content-Type':  'application/json',
            })
         };
        return this.http.get(this.baseUrl+'producto/',{params:parametro});

  }

  getPolitica() {
    let headers=
         new HttpHeaders(
           {
              'Access-Control-Allow-Origin':'*',
              "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
           });
         
   //console.log('getProducto '+this.baseUrl + '/producto')
   //return this.http.get<Producto[]>(this.baseUrl + 'producto')
   //,{headers:headers}
   return this.http.get(this.baseUrl+'politicaData/')      
 }

}
