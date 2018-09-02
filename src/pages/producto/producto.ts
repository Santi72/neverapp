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
    nombre: 'yogurt',
    marca: 'danone',
    cantidad: 6
  }
 
  constructor(private listaprov: ListaProvider,
            public navCtrl: NavController,
            public navParams: NavParams
            ) {

            this.email=navParams.get('email');           
            this.pass=navParams.get('pass');

    console.log("Producto Page :: "+this.email);
    console.log("Producto Page :: "+this.pass);
  }
 
  nuevoProducto(){
  this.listaprov.nuevoProducto(this.email, this.pass, this.producto)
    .subscribe(data => {

    });

  }   


}
