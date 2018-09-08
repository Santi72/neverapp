import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaProvider } from '../../providers/lista/lista';
import { ProductoModel } from '../../models/producto-model';


@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  email:string;
  pass:string;
 
  producto: ProductoModel = {
    nombre: '',
    marca: '',
    cantidad: 1
  }
 
  constructor(private listaprov: ListaProvider,
            public navCtrl: NavController,
            public navParams: NavParams,
            public listaProv: ListaProvider
            ) {

  }
 
  nuevoProducto(){

    this.listaProv.cargarStorage();

    console.log("nuevoProducto:: " + JSON.stringify(this.listaProv.userModel));

    this.listaprov.nuevoProducto(this.listaProv.userModel, this.producto)
      .subscribe(data => {

    });

  }   


}
