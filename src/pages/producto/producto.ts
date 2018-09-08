import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ListaProvider } from '../../providers/lista/lista';
import { ProductoModel } from '../../models/producto-model';
import { UserModel } from '../../models/user-model';


@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

 
  producto: ProductoModel = {
    nombre: '',
    marca: '',
    cantidad: 1
  }
 
  constructor(private listaprov: ListaProvider,
            public navCtrl: NavController,
            public navParams: NavParams,
            public listaProv: ListaProvider,
            private loadingCtrl: LoadingController
            ) {

  }
 
  nuevoProducto(){

    this.listaProv.cargarStorage().then( () =>{     
      this.listaprov.nuevoProducto(this.listaprov.userModel, this.producto)
        .subscribe(data => {

        });


    });  
    
  }     

}
