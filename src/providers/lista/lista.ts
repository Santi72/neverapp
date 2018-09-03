
import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
import { ProductoModel } from '../../models/producto-model';


@Injectable()
export class ListaProvider {

  lc_email: string;
  lc_pass: string;
  listaURL: string = "";

  constructor( public http: Http) { }


  nuevaLista( email: string, pass: string ){

    this.lc_email = email.substring(0, 3);
    this.lc_pass = pass.substring(0, 3);

    this.listaURL = "https://neverapp-c21a5.firebaseio.com/LC" + this.lc_email + this.lc_pass + ".json"

    let body = JSON.stringify( email );    
    console.log(body);
    let headers = new Headers({
       'Content-type':'application/json' 
    });

    return this.http.post(this.listaURL, body, { headers } )
            .map( res =>{
               console.log(res.json());
               return res.json();
            } )

  }

  nuevoProducto(email: string, pass: string, productoModel: ProductoModel ){

    this.lc_email = email.substring(0, 3);
    this.lc_pass = pass.substring(0, 3);

    console.log(productoModel);

    this.listaURL = "https://neverapp-c21a5.firebaseio.com/LC" + this.lc_email + this.lc_pass + ".json"

    let body = JSON.stringify( productoModel );
    
    console.log("Paso en el body :: "+body);
    let headers = new Headers({
      'Content-type': 'application/json'
    });

    return this.http.post(this.listaURL, body, { headers })
      .map(res => {
        console.log(res.json());
        return res.json();
      })

  }



}
