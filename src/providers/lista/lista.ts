
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
import { ProductoModel } from '../../models/producto-model';
import { UserModel } from '../../models/user-model';

import { Platform } from "ionic-angular";


@Injectable()
export class ListaProvider {

  lc_email: string = "";
  lc_pass: string = "";

  userModel :UserModel; 
  
  

  public productosLista: any[] = [];

  constructor(  public http: Http,
                private platForm: Platform,
                private storage: Storage
               
                ) { }




  listadoURL(userModel: UserModel){
    if (userModel) {
      this.lc_email = userModel.email.substring(0, 3);
      this.lc_pass = userModel.password.substring(0, 3);
    }
    return "https://neverapp-c21a5.firebaseio.com/LC" + this.lc_email + this.lc_pass + ".json";
  }

  productoURL(userModel: UserModel) {
    if (userModel) {
      this.lc_email = userModel.email.substring(0, 3);
      this.lc_pass = userModel.password.substring(0, 3);
    }
    return "https://neverapp-c21a5.firebaseio.com/LC" + this.lc_email + this.lc_pass+"/";
  }



  //FireBase POST Lista
  nuevaLista( ){

    let listaURL = this.listadoURL(this.userModel);

    let body = JSON.stringify(this.userModel.email );    
    console.log(body);
    let headers = new Headers({
       'Content-type':'application/json' 
    });

    return this.http.post(listaURL, body, { headers } )
            .map( res => res.json() )

  }

  //FB POST Producto
  nuevoProducto( productoModel: ProductoModel) {

    let listaURL = this.listadoURL(this.userModel);

    let body = JSON.stringify(productoModel);
    console.log(body);

    let headers = new Headers({
      'Content-type': 'application/json'
    });

    return this.http.post(listaURL, body, { headers })
            .map(res => {
              console.log(res.json());
              return res.json();
            })     
  }

  //FB PUT Producto (Tachar, echar al carrito)

  actualizarProducto(tachado: boolean, key$:string) {

    let productoURL = this.productoURL(this.userModel);

    let body = JSON.stringify(!tachado);

    let headers = new Headers({
      'Content-type': 'application/json'
    });

    let url = `${ productoURL }/${ key$ }/tachado.json`

    console.log("url:::"+url)

    return this.http.put( url, body, { headers })
      .map(res => {
        console.log(res.json());
        return res.json();
      })
  }

  //FB GET Listado
  getListado(userModel: UserModel){
    
    let listaURL = this.listadoURL(userModel);

    return this.http.get( listaURL )
            .map( res =>  res.json() ); 
  }

  //STORAGE para UserModel
  guardarStorage(userModel: UserModel) {

    if (this.platForm.is("cordova")) {
      //Dispositivo
      console.log("Dispositivo -Guardar Storage:: " + userModel);
      this.storage.ready()
        .then(() => {
          this.storage.set("nomlista", userModel);
        })
    } else {
      //Escritorio
      localStorage.setItem("nomlista", JSON.stringify(userModel));
    }

  }

  cargarStorage() {

    let promesa = new Promise((resolve, reject) => {

      if (this.platForm.is("cordova")) {
        //Dispositivo
        console.log("Dispositivo - inicializa storage");
        this.storage.ready()
          .then(() => {
            console.log("storage listo");
            this.storage.get("nomlista")
              .then(usermodel_loc => {

                if (usermodel_loc) {
                  this.userModel = usermodel_loc;
                }

                resolve();
              });
          })
      } else {
        //Escritorio
        console.log("Escritorio");
        if (localStorage.getItem("nomlista")) {
          this.userModel = JSON.parse(localStorage.getItem("nomlista"));
        }
        resolve();

      }
    });

    return promesa;   

  }

}
