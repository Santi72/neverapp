
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
import { ProductoModel } from '../../models/producto-model';
import { UserModel } from '../../models/user-model';

import { Platform } from "ionic-angular";
import { User } from 'firebase';

@Injectable()
export class ListaProvider {

  lc_email: string;
  lc_pass: string;
  listaURL: string = "";

  userModel :UserModel;  

  constructor( public http: Http,
                private platForm: Platform,
                private storage: Storage) { }


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
      console.log("Escritorio -Guardar Storage JSON:: " + JSON.stringify(userModel));
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
          console.log(this.userModel);
        }

        resolve();

      }

    });

    return promesa;   



  }




  nuevoProducto(userModel: UserModel, productoModel: ProductoModel ){

    this.lc_email = userModel.email.substring(0, 3);
    this.lc_pass = userModel.password.substring(0, 3);

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
