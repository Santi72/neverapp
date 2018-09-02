import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SigninPage } from '../signin/signin';
import { ProductoPage } from '../index.paginas';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  paginaProducto:any = ProductoPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider) {
     
    console.log(navParams.get('email'));
    console.log(navParams.get('pass'));
  }

  signOut(){
    this.authProvider.signOut();
    this.navCtrl.setRoot(SigninPage);
  }

 

  apuntarProducto(){
    this.navCtrl.push(this.paginaProducto);
  }

  tacharProducto(){
    console.log("Tachar el producto (echar al carrito)")
  }


}
