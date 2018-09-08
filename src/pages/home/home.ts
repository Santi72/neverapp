import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SigninPage } from '../signin/signin';
import { ProductoPage } from '../index.paginas';
import { ListaProvider } from '../../providers/lista/lista';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider,
              public listaProv: ListaProvider
              ) {

         
  }

  signOut(){
    this.authProvider.signOut();
    this.navCtrl.setRoot(SigninPage);    
  } 

  apuntarProducto(){ 

    this.navCtrl.push(ProductoPage);
  }

  tacharProducto(){
    console.log("Tachar el producto (echar al carrito)")
  }


}
