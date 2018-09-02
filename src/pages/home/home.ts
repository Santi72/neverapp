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

  email: string;
  pass: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider,
              ) {

    this.email = navParams.get('email');
    this.pass = navParams.get('pass');  

    console.log("Home mail :: "+this.email);
    console.log("Homa pass :: "+this.pass);
         
  }

  signOut(){
    this.authProvider.signOut();
    this.navCtrl.setRoot(SigninPage);
  } 

  apuntarProducto(){
    this.navCtrl.push(ProductoPage, { 'email': this.email, 'pass': this.pass });
  }

  tacharProducto(){
    console.log("Tachar el producto (echar al carrito)")
  }


}
