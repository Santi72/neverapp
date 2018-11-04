
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
  lc_uid: string = "";

  userModel :UserModel; 
  productoModel: ProductoModel; 

 

  public productosLista: any[] = [];

  constructor(  public http: Http,
                private platForm: Platform,
                private storage: Storage
               
                ) { }


  listadoURL(userModel: UserModel){
    if (userModel) {
      //this.lc_email = userModel.email.substring(0, 3);
      //this.lc_pass = userModel.password.substring(0, 3);
      this.lc_uid = userModel.uid.substring(0, 4);
      console.log("listadoURL() - this.lc_uid:: " + this.lc_uid);
      
      
    }
    //return "https://neverapp-c21a5.firebaseio.com/LC" + this.lc_email + this.lc_pass + ".json";
    return "https://neverapp-c21a5.firebaseio.com/LC" + this.lc_uid + ".json";
    
  }

  productoURL(userModel: UserModel) {
    if (userModel) {
      //this.lc_email = userModel.email.substring(0, 3);
      //this.lc_pass = userModel.password.substring(0, 3);
      this.lc_uid = userModel.uid.substring(0, 4);
      console.log("productoURL() - this.lc_uid:: " + this.lc_uid);
    }
    //return "https://neverapp-c21a5.firebaseio.com/LC" + this.lc_email + this.lc_pass+"/";
    return "https://neverapp-c21a5.firebaseio.com/LC" + this.lc_uid + "/";
  }



  //FireBase POST Lista
  nuevaLista( userModel: UserModel ){

    let listaURL = this.listadoURL(userModel);

    console.log("nuevaLista() - listaURL:: " + listaURL);

    let body = JSON.stringify(userModel.email );    
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

    return this.http.post(listaURL , body, { headers })
            .map(res => {
              console.log(res.json());
              return res.json();
            })     
  }

  //FB PUT Producto (Tachar, echar al carrito)

  actualizarProducto(tachado: boolean, key$:string) {

    let productoURL = this.productoURL(this.userModel);

    let body = JSON.stringify(!tachado);  // <- Lo contrario a lo que tenga

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

  eliminarProducto(key$:string){

    let productoURL = this.productoURL(this.userModel);

    let url = `${productoURL}/${key$}.json`

    return this.http.delete( url )
      .map ( res =>{
        console.log(res.json());
        return res.json();
      })
  }



  //FB GET Listado
  getListado(userModel: UserModel){
    
    let listaURL = this.listadoURL(userModel);

   
    let url = `${listaURL}?orderByValue()`
    // Pruebas de Ordenacion Pendientes // url = `https://neverapp-c21a5.firebaseio.com/LCsansan.json?orderBy="marca"&limitToFirst=3`
    console.log(url)

    return this.http.get(url)      
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
      console.log("Escritorio -Guardar Storage:: " + userModel);
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
