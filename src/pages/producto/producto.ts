import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaProvider } from '../../providers/lista/lista';
import { ProductoModel } from '../../models/producto-model';

import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

 
  producto: ProductoModel = {
    nombre: '',    
    marca: '',   
    cantidad: 1,
    tachado: false
    //,
    //variedad: ''
  }
 
  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            public listaProv: ListaProvider,
            private toastCtrl: ToastController
            ) {

  }
 
  nuevoProducto(){

    this.listaProv.cargarStorage().then( () =>{     
      this.listaProv.nuevoProducto( this.producto)
        .subscribe(data => {
          this.mostrarToastNuevoProducto(this.producto.nombre + " " + this.producto.marca +" en la lista. Toca sobre el producto para ponerlo en el carrito"); 

          this.navCtrl.pop();
        });
    });     
  }
  
  mostrarToastNuevoProducto(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();

  }



}
