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

 
  producto: ProductoModel = {
    nombre: '',
    marca: '',   
    cantidad: 1,
    tachado: false
  }
 
  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            public listaProv: ListaProvider,
            ) {

  }
 
  nuevoProducto(){

    this.listaProv.cargarStorage().then( () =>{     
      this.listaProv.nuevoProducto( this.producto)
        .subscribe(data => {
          this.navCtrl.pop();
        });


    });  
    
  }     

}
