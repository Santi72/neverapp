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
     
    if (authProvider.authenticated) {
      console.log(authProvider.user.email);
      console.log(authProvider.user.emailVerified );
    }
  }

  signOut(){
    this.authProvider.signOut();
    this.navCtrl.setRoot(SigninPage);
  }

  navegarProducto(){
    this.navCtrl.push( this.paginaProducto);
  }


}
