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

  getInicio(estab:number) {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'inicio2/'+estab,{'headers':headers})      
  }

  getProductosParciales(page) {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'producto/'+ page,{'headers':headers})
  }
  getInicioBuscar(busqueda,estab) {
    let parametro= new HttpParams().set('nombre',busqueda);
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'inicio2/'+estab,{'headers':headers,params:parametro})      
  }

  getCategoria() {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.baseUrl+'categorias/',{'headers':headers})      
  }

  getProductosCategoria(id,estab) {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    console.log(this.baseUrl+'categorias/?id='+id+"&?establecimiento="+estab)
    return this.http.get(this.baseUrl+'categorias/?id='+id+"&establecimiento="+estab,{'headers':headers})      
  }

  getOferta(estab:number) {
    const headers = {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
    console.log('ESTAAAAAAAAB')
    console.log(this.baseUrl+'ofertasData/'+"?establecimiento="+estab,{'headers':headers})
   return this.http.get(this.baseUrl+'ofertasData/'+"?establecimiento="+estab,{'headers':headers})      
         
     
 }

 addOferta(oferta: Oferta):Observable<any>{
  const headers = {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json'
  }
  return this.http.post(this.baseUrl+'ofertasData/',oferta,{'headers':headers})
 }


  getProductosByFiltro(filtro: String, page: number, estab:number){
    switch (filtro) {
      case "vendidos":
        console.log(this.baseUrl+'producto/'+page+"?establecimiento="+estab)
        return this.http.get(this.baseUrl+'producto/'+page+"?establecimiento="+estab)      
        break;
      case "menor":
      return this.http.get(this.baseUrl+'producto/precioMayor/'+page+"?establecimiento="+estab)      
        break;
      case "mayor":
      return this.http.get(this.baseUrl+'producto/precioMenor/'+page+"?establecimiento="+estab)      
        break;
      case "ascendente":
      return this.http.get(this.baseUrl+'producto/orderAsc/'+page+"?establecimiento="+estab)
        break;
      case "descendente":
      return this.http.get(this.baseUrl+'producto/orderDesc/'+page+"?establecimiento="+estab)      
        break;
      default:
       return this.http.get(this.baseUrl+'producto/'+"?establecimiento="+estab)      
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
